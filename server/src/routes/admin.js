import express from 'express';
import Admin from '../controllers/Admin';
import Validate from '../middleware/Validate';

const router = express.Router();

const adminController = new Admin();


router.post(
  '/create',
  Validate.createBill,
  adminController.createBill
);

router.patch(
  '/edit/:billId',
  Validate.billId,
  adminController.editBill
);

router.delete(
  '/delete/:billId',
  Validate.billId,
  adminController.deleteBill
);

export default router;
