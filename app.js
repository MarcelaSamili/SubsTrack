import express from 'express';

import { PORT } from './config/env.js';

import userRouter from './routs/user.routes.js';
import authRouter from './routs/auth.routes.js';
import subscriptionRouter from './routs/subscription.routes.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);

app.get('/', (req, res) => {
  res.send('Wlcome to the SubsTrack API');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

export default app;
