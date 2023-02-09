import { Request, Response } from 'express';
import APIError from '../../errors/api-errors';
import { StatusCodes } from 'http-status-codes';
import u from '../../utils';
import db from '../../db/prisma';
import { Role } from '@prisma/client';
import crypto from 'crypto';
import {
  Login,
  Register,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
} from './auth.models';

//
// ########## login
//

export async function login(req: Request, res: Response) {
  // Validate the input with zod
  const { email, password: userPassword } = await Login.parseAsync(req.body);

  // Get password, id and from the database
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true, password: true, role: true },
  });

  // Throw an error if the user doesn't exist
  if (!user) {
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
  if (!passwordIsCorrect)
    throw new APIError.Unauthenticated(
      'These credentials do not match our records!'
    );

  if (role === Role.UNVERIFIED)
    throw new APIError.Unauthenticated('Email is not verified!');

  // Store the session in redis and send the cookie
  req.session.user = { id, role };

  // Response
  res.status(StatusCodes.OK).json({
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

  // Check email if exist
  const emailCheckExist = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  // Throw an error if email exits
  if (emailCheckExist) {
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
  //   subject: 'CaierSpace verification email',
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

  // Response
  res.status(StatusCodes.CREATED).json({
    message: 'Success! Please check your email to verify',
  });
}

//
// ########## logout
//

const logout = async (req: Request, res: Response) => {
  // Delete de session from the redis db
  req.session.destroy((err) => {
    if (err) {
      throw new Error('Could not logout the user');
    }

    // Clear cookie and redirect
    res.clearCookie('sessionId');
    res.redirect('/login');
  });
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
  if (!user) throw new APIError.BadRequestError('Please provide valid email');

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
  if (!user) throw new APIError.BadRequestError('Please provide valid email');

  // Get the verification_code and updated_at parameters of the user
  const { verificationCode, updatedAt: tokenExpirationDate } = user;

  // Throw error if token is invalid
  if (!tokenExpirationDate)
    throw new APIError.BadRequestError(
      'There is no token for resetting the password!'
    );

  // Throw error if token is invalid
  if (verificationToken !== verificationCode)
    throw new APIError.BadRequestError('Verification Token is invalid');

  // Compare expiration date for token and verification code
  const currentDate = new Date();
  console.log(tokenExpirationDate.getTime(), currentDate.getTime());
  console.log(tokenExpirationDate.getTime() < currentDate.getTime());
  console.log(tokenExpirationDate.getTime() > currentDate.getTime());
  if (tokenExpirationDate.getTime() < currentDate.getTime())
    throw new APIError.BadRequestError('Verification Token is expired!');

  // Encrypt the password
  const passwordEncrypted = await u.generatePassword(password);

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
