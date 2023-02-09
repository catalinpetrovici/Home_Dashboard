import * as z from 'zod';
import { Role } from '@prisma/client';

export const Login = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Not a valid email'),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
});

export const Register = z.object({
  id: z.string().optional(),
  verificationCode: z.string().optional(),
  updatedAt: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
  email: z
    .string({
      required_error: 'email is required',
    })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, { message: 'Password must be 8 or more characters long' }),
  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .min(1, { message: 'Last name must be 1 or more characters long' }),
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .min(1, { message: 'First name must be 1 or more characters long' }),
  phoneNumber: z
    .string({
      required_error: `Phone number is required`,
      invalid_type_error: `Phone number must be a string`,
    })
    .regex(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      {
        message: 'Invalid phone number',
      }
    ),
});

export const VerifyEmail = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Not a valid email'),
  verificationToken: z.string({
    required_error: 'Verification Token is required',
  }),
});

export const ForgotPassword = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Not a valid email'),
});

export const ResetPassword = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Not a valid email'),
  verificationToken: z.string({
    required_error: 'Verification Token is required',
  }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, { message: 'Password must be 8 or more characters long' }),
});

export type Login = z.infer<typeof Login>;
export type Register = z.infer<typeof Register>;
export type VerifyEmail = z.infer<typeof VerifyEmail>;
export type ForgotPassword = z.infer<typeof ForgotPassword>;
export type ResetPassword = z.infer<typeof ResetPassword>;

export interface MyContext {
  req: Request & { session: Express.SessionStore };
  res: Response;
}
