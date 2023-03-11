import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};

interface CreateUser {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export async function createUser(user: CreateUser, ctx: Context) {
  return await ctx.prisma.user.create({
    data: user,
  });
}
