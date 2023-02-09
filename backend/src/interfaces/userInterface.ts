import { Request, Response, NextFunction } from 'express';

export interface UserLogin {
  email: string;
  password: string;
  mamMare: string;
}
