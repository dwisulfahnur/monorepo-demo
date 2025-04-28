import dotenv from 'dotenv';

dotenv.config()

import cors from "cors";
import express from 'express';
import userRoutes from '../routes/userRoutes';
import authMiddleware from '../middleware/authMiddleware';


const app = express();

app.use(cors())
app.use(express.json())
app.use(authMiddleware);
app.use(userRoutes)
export default app;
