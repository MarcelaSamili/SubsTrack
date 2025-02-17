import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser); //http://api/v/users/id aqui...

userRouter.post('/', (req, res) => res.send({ title: 'POST new user' }));

userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE user' }));

userRouter.delete('/:id', (req, res) =>
  res.send({ title: 'DELETE all users' })
);

export default userRouter;
