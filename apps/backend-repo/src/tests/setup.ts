import { jest } from '@jest/globals';
import { z } from 'zod';
import { IUser } from "@packages/shared/types/user";


// Default user data
const DEFAULT_USER_DATA = {
  totalAverageWeightRatings: 0,
  numberOfRents: 0,
};

// Mock Auth Token
const mockAuth = {
  verifyIdToken: jest.fn((token: string) => {
    if (token === 'valid-token') {
      return Promise.resolve({ uid: 'test-uid' });
    }
    throw new Error('Invalid token');
  }),
};

// Mock User Repository
const mockUserRepository = {
  getUser: jest.fn((uid: string) => {
    if (uid === 'test-uid') {
      return Promise.resolve({
        ...DEFAULT_USER_DATA,
        recentlyActive: Math.floor((new Date()).getTime() / 1000)
      });
    }
    return Promise.resolve(null);
  }),
  updateOrCreateUser: jest.fn((uid: string, data: Partial<IUser>) => {
    return Promise.resolve({
      ...DEFAULT_USER_DATA,
      ...data,
      recentlyActive: Math.floor((new Date()).getTime() / 1000)
    });
  }),
};

// Mock the updateUserSchema
jest.mock('../entities/userEntity', () => ({
  updateUserSchema: z.object({
    totalAverageWeightRatings: z.number().optional(),
    numberOfRents: z.number().optional(),
  }),
}));

jest.mock('../config/firebaseConfig', () => ({
  auth: mockAuth,
}));

// Fix the repository mock to properly export the functions
jest.mock('../repository/userRepository', () => mockUserRepository); 