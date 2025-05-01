import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';
import authMiddleware from '../middleware/authMiddleware';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('User API Endpoints', () => {
  let app: express.Application;

  // Test data
  const TEST_USER = {
    totalAverageWeightRatings: 0,
    numberOfRents: 0,
    recentlyActive: expect.any(Number)
  };

  const VALID_TOKEN = 'Bearer valid-token';
  const INVALID_TOKEN = 'Bearer invalid-token';

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(authMiddleware);
    app.use('/api', userRoutes);
    
    // Add error handling middleware to log errors
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Error in test:', err);
      res.status(500).json({ 
        error: err.message,
        stack: err.stack 
      });
    });
  });

  describe('GET /api/fetch-user-data', () => {
    it('should return 401 when no token is provided', async () => {
      const response = await request(app)
        .get('/api/fetch-user-data');

      expect(response.status).toBe(401);
    });

    it('should return 403 when invalid token is provided', async () => {
      const response = await request(app)
        .get('/api/fetch-user-data')
        .set('Authorization', INVALID_TOKEN);

      expect(response.status).toBe(403);
    });

    it('should return user data when valid token is provided', async () => {
      const response = await request(app)
        .get('/api/fetch-user-data')
        .set('Authorization', VALID_TOKEN);

      if (response.status === 500) {
        console.error('500 Error Response:', response.body);
      }

      expect(response.status).toBe(200);
      expect(response.body).toEqual(TEST_USER);
    });
  });

  describe('PATCH /api/update-user-data', () => {
    const VALID_UPDATE_DATA = {
      totalAverageWeightRatings: 5,
      numberOfRents: 10,
    };

    const INVALID_UPDATE_DATA = {
      totalAverageWeightRatings: 'not-a-number',
    };

    it('should return 401 when no token is provided', async () => {
      const response = await request(app)
        .patch('/api/update-user-data')
        .send(VALID_UPDATE_DATA);

      expect(response.status).toBe(401);
    });

    it('should return 400 when invalid data is provided', async () => {
      const response = await request(app)
        .patch('/api/update-user-data')
        .set('Authorization', VALID_TOKEN)
        .send(INVALID_UPDATE_DATA);

      if (response.status === 500) {
        console.error('500 Error Response:', response.body);
      }

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should update user data when valid token and data are provided', async () => {
      const response = await request(app)
        .patch('/api/update-user-data')
        .set('Authorization', VALID_TOKEN)
        .send(VALID_UPDATE_DATA);

      if (response.status === 500) {
        console.error('500 Error Response:', response.body);
      }

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...VALID_UPDATE_DATA,
        recentlyActive: expect.any(Number)
      });
    });

    it('should only update recentlyActive when no data is provided', async () => {
      const response = await request(app)
        .patch('/api/update-user-data')
        .set('Authorization', VALID_TOKEN)
        .send({});

      if (response.status === 500) {
        console.error('500 Error Response:', response.body);
      }

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        totalAverageWeightRatings: 0,
        numberOfRents: 0,
        recentlyActive: expect.any(Number)
      });
    });
  });
}); 