// ./src/actions/createUserAction.test.ts

import { PrismaClient, User } from '@prisma/client';
import request from 'supertest';
import axios from 'axios';

import app from '../../app';

const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.$disconnect();
  jest.resetAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

describe('POST /users', () => {
  const email = 'test@yahoo.com';
  const phoneNumber = '0123456789';
  const password = 'password';

  test('valid - register', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
      email,
      password,
      lastName: 'testName',
      firstName: 'testName',
      phoneNumber,
    });

    expect(response.statusCode).toBe(201);
  });

  test('valid - verifyEmail', async () => {
    const [user] = await prisma.user.findMany({
      where: { email },
      take: 1,
    });

    const { verificationCode } = user;

    const response = await request(app).post('/api/v1/auth/verify-email').send({
      email,
      verificationToken: verificationCode,
    });

    expect(response.statusCode).toBe(200);
  });

  test('valid - login', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email,
      password,
    });

    expect(response.statusCode).toBe(200);
  });

  test('valid - forgotPassword', async () => {
    const response = await request(app)
      .post('/api/v1/auth/forgot-password')
      .send({
        email,
      });

    expect(response.statusCode).toBe(200);
  });

  test('valid - resetPassword', async () => {
    const [user] = await prisma.user.findMany({
      where: { email },
      take: 1,
    });

    const { verificationCode } = user;

    const response = await request(app).post('/api/v1/auth/login').send({
      email,
      verificationToken: verificationCode,
      password: 'password',
    });

    expect(response.statusCode).toBe(200);
  });

  test('invalid - login', async () => {
    let response = {
      statusCode: 0,
    };
    try {
      response = await request(app).post('/api/v1/auth/login').send({
        email,
        password: 'invalidPassword',
      });
    } catch (error) {
      console.log(error);
    }

    expect(response.statusCode).toBe(403);
  });
});
