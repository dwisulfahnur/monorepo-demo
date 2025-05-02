import { Router } from "express";
import { getUserHandler, updateUserHandler } from "../controller/api";

const userRoutes = Router();

userRoutes.get('/fetch-user-data', getUserHandler);
userRoutes.patch('/update-user-data', updateUserHandler);

export default userRoutes;