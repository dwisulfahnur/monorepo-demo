import express from 'express';
import userRoutes from '../routes/userRoutes';
import authMiddleware from '../middleware/authMiddleware';


const app = express();
const PORT = 4000;

app.use(authMiddleware);
app.use('', userRoutes)
app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
});

export default app;