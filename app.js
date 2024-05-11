import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routes/userRouter.js';

export const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/users/', userRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});
