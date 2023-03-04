// prettier-ignore
import { Login, Register, VerifyEmail, ForgotPassword, ResetPassword } from './auth.models';
import { Request, Response } from 'express';
import APIError from '../../errors/api-errors';
import StatusCodes from '../../interfaces/types/http.model';
import u from '../../utils';
import db from '../../db/prisma';
import { Role } from '@prisma/client';
import crypto from 'crypto';
import Logger from '../../log/pino';

//
// ########## login
//

export async function login(req: Request, res: Response) {
  // Validate the input with zod
  const {
    email,
    password: userPassword,
    keepMe,
  } = await Login.parseAsync(req.body);

  // Get password, id and from the database
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true, password: true, role: true },
  });

  // Throw an error if the user doesn't exist
  if (!user) {
    Logger.info({ HTTP: 'login', email }, `❌ User doesn't exist!`);
    throw new APIError.BadRequestError(
      'These credentials do not match our records!'
    );
  }

  const { id, role, password: databasePassword } = user;

  // Compare passwords
  const passwordIsCorrect = await u.comparePassword(
    userPassword,
    databasePassword
  );

  // Throw an error if the user password is not correct
  if (!passwordIsCorrect) {
    await db.userAuthLog.create({
      data: {
        email,
        eventType: 'LOGIN',
        message: 'Incorrect Password',
        userAgent: res.locals.device,
      },
    });
    Logger.info({ HTTP: 'login', email }, `❌ User password is not correct!`);
    throw new APIError.Unauthenticated(
      'These credentials do not match our records!'
    );
  }

  // Throw an error if the user email is not verified
  if (role === Role.UNVERIFIED)
    throw new APIError.Unauthenticated('Email is not verified!');

  // Store the session in redis and send the cookie
  req.session.user = { id };

  // Set maxAge of session cookie to a day if keepMe is true
  if (keepMe) req.session.cookie.maxAge = 25 * 60 * 60 * 1000;

  //
  const authenticatedCookie = Buffer.from(
    `{ "authenticated": true, "role": "${role}" }`
  ).toString('base64');

  // Store a log
  await db.userAuthLog.create({
    data: {
      email,
      eventType: 'LOGIN',
      message: 'User logged in',
      userAgent: res.locals.device,
    },
  });

  Logger.info({ HTTP: 'login', email }, `✅ User logged in!`);

  // Response
  res
    .cookie('authenticated', authenticatedCookie, {
      maxAge: req.session.cookie.maxAge,
    })
    .status(StatusCodes.OK)
    .json({
      message: 'Success! Login!',
    });
}

//
// ########## register
//

export async function register(req: Request, res: Response) {
  // Validate the input with zod
  const user = await Register.parseAsync(req.body);
  const { email, password, firstName } = user;

  if (process.env.SIGNUPS_ALLOWED === 'false') {
    Logger.info(
      { HTTP: 'register', email },
      `🚫 Registration is currently disabled!`
    );
    throw new APIError.BadRequestError('Registration is closed');
  }

  // Check email if exist
  const emailCheckExist = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  // Throw an error if email exits
  if (emailCheckExist) {
    Logger.info({ HTTP: 'register', email }, `❌ Email exits!`);
    throw new APIError.BadRequestError('Email already exists');
  }

  // Encrypt the password
  const passwordEncrypted = await u.generatePassword(password);

  // Generate verification code
  const verificationCode = crypto.randomBytes(10).toString('hex');

  // Send email verification
  // const origin = 'http://localhost:3002';
  // await u.email.sendEmailHandlebars({
  //   firstName,
  //   email,
  //   subject: 'Verification email',
  //   verificationLink: origin,
  //   templateEmail: 'verificationEmail',
  // });

  // Insert the date into the database
  await db.user.create({
    data: {
      ...user,
      password: passwordEncrypted,
      verificationCode,
    },
  });

  Logger.info({ HTTP: 'register', email }, `✅ User registered!`);

  // Response
  res.status(StatusCodes.CREATED).json({
    message: 'Success! Please check your email to verify',
  });
}

//
// ########## logout
//

const logout = async (req: Request, res: Response) => {
  const { email } = res.locals.user;

  // Delete de session from the redis db
  req.session.destroy((err) => {
    if (err) {
      throw new Error('Could not logout the user');
    }
  });

  Logger.info({ HTTP: 'logout', email }, `✅ User logged out!`);

  // Clear cookie and redirect
  res.clearCookie('sessionId').clearCookie('authenticated');
  res.end();
};

//
// ########## verifyEmail
//

const verifyEmail = async (req: Request, res: Response) => {
  // Validate the input with zod
  const { verificationToken, email } = await VerifyEmail.parseAsync(req.body);

  // Get the ID and verificationCode parameters of the user
  const user = await db.user.findUnique({
    where: { email },
    select: { verificationCode: true },
  });

  // Throw an error if the user doesn't exist
  if (!user) {
    Logger.info({ HTTP: 'verifyEmail', email }, `❌ User doesn't exist!`);
    throw new APIError.BadRequestError('Verification Failed!');
  }

  const { verificationCode } = user;

  // Throw error if the user token is invalid
  if (verificationToken !== verificationCode)
    throw new APIError.Unauthenticated('Verification Failed');

  // Update the role and verificationCode of the user
  await db.user.update({
    where: {
      email,
    },
    data: {
      role: Role.BASIC,
      verificationCode: null,
    },
  });

  Logger.info({ HTTP: 'verifyEmail', email }, `✅ Email Verified!`);

  // Response
  res.status(StatusCodes.OK).json({ msg: 'Email Verified!' });
};

//
// ########## forgotPassword
//

const forgotPassword = async (req: Request, res: Response) => {
  // Validate the input with zod
  const { email } = await ForgotPassword.parseAsync(req.body);

  // Get the ID and firstName parameters of the user
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true, firstName: true },
  });

  // Throw error if the user doesn't exist
  if (!user) {
    Logger.info({ HTTP: 'forgotPassword', email }, `❌ User doesn't exist!`);
    throw new APIError.BadRequestError('Please provide valid email');
  }

  const { id, firstName } = user;

  // Generate the passwordToken
  const verificationCode = crypto.randomBytes(10).toString('hex');

  // Set a expiration date for token
  const tenMinutes = 1;
  const passwordTokenExpirationDate = u.inMinutes(tenMinutes);

  // Send email
  const origin = 'http://localhost:3002';
  // await u.email.sendResetPasswordEmail({
  //   name: firstName,
  //   email: email,
  //   token: verificationCode,
  //   origin,
  // });

  // Store a log
  await db.userAuthLog.create({
    data: {
      email,
      eventType: 'FORGOT-PASSWORD',
      message: 'User forgot the password',
      userAgent: res.locals.device,
    },
  });

  // Update the role and verificationCode of the user
  await db.user.update({
    where: {
      email,
    },
    data: {
      role: Role.LOST,
      verificationCode,
      updatedAt: passwordTokenExpirationDate,
    },
  });

  Logger.info(
    { HTTP: 'forgotPassword', email },
    `✅ Please check your email for reset password link!`
  );

  // Response
  res
    .status(StatusCodes.OK)
    .json({ message: 'Please check your email for reset password link' });
};

//
// ########## resetPassword
//

const resetPassword = async (req: Request, res: Response) => {
  // Validate the input with zod
  const { verificationToken, email, password } = await ResetPassword.parseAsync(
    req.body
  );

  // Get the ID and firstName parameters of the user
  const user = await db.user.findUnique({
    where: { email },
    select: { verificationCode: true, updatedAt: true },
  });

  // Throw error if the user doesn't exist
  if (!user) {
    Logger.info({ HTTP: 'resetPassword', email }, `❌ User doesn't exist!`);
    throw new APIError.BadRequestError('Please provide valid email');
  }

  // Get the verification_code and updated_at parameters of the user
  const { verificationCode, updatedAt: tokenExpirationDate } = user;

  // Throw error if token is invalid
  if (!tokenExpirationDate)
    throw new APIError.BadRequestError(
      'There is no token for resetting the password!'
    );

  // Throw error if token is invalid
  if (verificationToken !== verificationCode) {
    Logger.info({ HTTP: 'resetPassword', email }, `❌ Token is invalid!`);
    throw new APIError.BadRequestError('Verification Token is invalid');
  }

  // Compare expiration date for token and verification code
  const currentDate = new Date();
  if (tokenExpirationDate.getTime() < currentDate.getTime()) {
    Logger.info(
      { HTTP: 'resetPassword', email },
      `❌ Verification Token is expired!`
    );
    throw new APIError.BadRequestError('Verification Token is expired!');
  }

  // Encrypt the password
  const passwordEncrypted = await u.generatePassword(password);

  // Store a log
  await db.userAuthLog.create({
    data: {
      email,
      eventType: 'RESET-PASSWORD',
      message: 'User has reset the password',
      userAgent: res.locals.device,
    },
  });

  // Update user
  await db.user.update({
    where: {
      email,
    },
    data: {
      role: Role.BASIC,
      verificationCode: null,
      password: passwordEncrypted,
    },
  });

  Logger.info({ HTTP: 'resetPassword', email }, `✅ Password has been reset!`);

  // Response
  res.status(StatusCodes.NO_CONTENT);
};

export default {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
