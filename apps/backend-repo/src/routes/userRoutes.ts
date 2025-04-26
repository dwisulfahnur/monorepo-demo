import { Router } from "express";
import { getUserHandler, updateUserHandler } from "../controller/api";

const userRoutes = Router();

userRoutes.get('/update-user-data', getUserHandler);
userRoutes.put('/fetch-user-data', updateUserHandler);

export default userRoutes;