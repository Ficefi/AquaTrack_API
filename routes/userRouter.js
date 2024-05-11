import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { createUserSchema, loginUserSchema } from '../schemas/userSchemas.js';
import { SignIn, SignUp, LogOut } from '../controllers/usersControllers.js';
import { auth } from '../middlewares/authenticate.js';

const userRouter = express.Router();

userRouter.post('/register', validateBody(createUserSchema), SignUp);

userRouter.post('/login', validateBody(loginUserSchema), SignIn);

userRouter.post('/logout', auth, LogOut);

// userRouter.get('/current', auth, userCurrent);

export default userRouter;
