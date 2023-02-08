import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import APIError from '../../errors/api-errors';
import { StatusCodes } from 'http-status-codes';
import u from '../../utils';
import crypto from 'crypto';
import {
  Login,
  Register,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
} from './auth.models';

const prisma = new PrismaClient();
//
// ########## login
//

export async function login(req: Request, res: Response) {
  // Validate the input with zod
  const { email, password: userPassword } = await Login.parseAsync(req.body);

  // Get password, id and from the database
  // TODO PRISMA
  const user = '';
  // await AuthModel.findOne(
  //   {
  //     email,
  //   },
  //   ['id', 'password', 'role']
  // );

  // Throw an error if the user doesn't exist
  if (!user) {
    throw new APIError.BadRequestError(
      'These credentials do not match our records!'
    );
  }

  const { password: databasePassword, id, role } = user;

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

  if (role === 'UNVERIFIED')
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
  // TODO PRISMA
  const emailCheckExist = '';
  // await AuthModel.findOne({ email }, ['id', 'email']);

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
  // TODO PRISMA
  // await AuthModel.create({
  //   ...user,
  //   password: passwordEncrypted,
  //   verificationCode: verificationCode,
  // });

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
  // TODO PRISMA
  const { id, verificationCode } = { id: '', verificationCode: '' };
  // const { id, verificationCode } = await AuthModel.findOne({ email }, [
  //   'id',
  //   'verificationCode',
  // ]);

  // Throw error if the user doesn't exist
  if (!id) throw new APIError.Unauthenticated('Verification Failed');

  // Throw error if the user token is invalid
  if (verificationToken !== verificationCode)
    throw new APIError.Unauthenticated('Verification Failed');

  // Update the role and verificationCode of the user
  // TODO PRISMA
  // await AuthModel.updateOne(
  //   { email },
  //   { role: 'VERIFIED', verificationCode: null }
  // );

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
  // TODO PRISMA
  const { id, firstName } = { id: '', firstName: '' };
  // const { id, firstName } = await AuthModel.findOne({ email }, [
  //   'id',
  //   'firstName',
  // ]);

  // Throw error if the user doesn't exist
  if (!id) throw new APIError.BadRequestError('Please provide valid email');

  // Generate the passwordToken
  const verificationCode = crypto.randomBytes(10).toString('hex');

  // Set a expiration date for token
  const tenMinutes = 10;
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
  // TODO PRISMA
  // await AuthModel.updateOne(
  //   { email },
  //   {
  //     role: 'LOST',
  //     verificationCode: verificationCode,
  //     updatedAt: passwordTokenExpirationDate,
  //   }
  // );

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

  // Get the verification_code and updated_at parameters of the user
  const { verificationCode, updatedAt: tokenExpirationDate } = {
    verificationCode: '',
    updatedAt: '',
  };
  // TODO PRISMA
  // await AuthModel.findOne({ email }, ['verificationCode', 'updatedAt']);

  // Throw error if token is invalid
  if (!tokenExpirationDate)
    throw new APIError.BadRequestError(
      'There is no token for resetting the password!'
    );

  // Throw error if token is invalid
  if (verificationToken !== verificationCode)
    throw new APIError.BadRequestError('Verification Token is invalid');

  // Compare expiration date for token and verification code
  const currentDate = String(new Date());
  if (tokenExpirationDate > currentDate)
    throw new APIError.BadRequestError('Verification Token is expired!');

  // Encrypt the password
  const passwordEncrypted = await u.generatePassword(password);

  // Update user
  // TODO PRISMA
  // await AuthModel.updateOne(
  //   { email },
  //   { role: 'VERIFIED', verificationCode: null, password: passwordEncrypted }
  // );

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
