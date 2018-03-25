import express from 'express';
import User from '../controllers/Users';

import userRoutes from './user';
import adminRoutes from './admin';
import Authenticate from '../utils/Authenticate';
import Validate from '../middleware/Validate';


const router = express.Router();

const userController = new User();

router.post(
  '/signup',
  Validate.signup,
  userController.signup
);

router.post(
  '/signin',
  Validate.signin,
  userController.signin
);

router.get(
  '/bills',
  userController.viewAllBills
);

router.use(
  '/',
  Authenticate.Verify,
  userRoutes
);

router.use(
  '/bill/',
  Authenticate.Verify,
  Authenticate.Admin,
  adminRoutes
);

export default router;

