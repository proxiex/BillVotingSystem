import express from 'express';
import User from '../controllers/Users';
import Validate from '../middleware/Validate';
import Authenticate from '../utils/Authenticate';

const userController = new User();

const router = express.Router();

router.get(
  '/bills/votes',
  Authenticate.Verify,
  userController.viewVotedBills
);

router.post(
  '/bill/vote/:billId/:voteValue',
  Validate.billId,
  Validate.voteValue,
  userController.voteBill
);

export default router;
