import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { createUserSchema, loginUserSchema } from '../schemas/userSchemas.js';
import {
  SignIn,
  SignUp,
  LogOut,
  userCurrent,
  userUpdate,
  countOfUsers,
} from '../controllers/usersControllers.js';
import { auth } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

const userRouter = express.Router();

userRouter.post('/register', validateBody(createUserSchema), SignUp);

userRouter.post('/login', validateBody(loginUserSchema), SignIn);

userRouter.post('/logout', auth, LogOut);

userRouter.get('/current', auth, userCurrent);

userRouter.get('/users_count', countOfUsers);

userRouter.put('/update', auth, upload.single('avatar'), userUpdate);

export default userRouter;
