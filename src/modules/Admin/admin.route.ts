import express from 'express';
import { AdminController } from './admin.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.get('/users', auth(UserRole.admin), AdminController.getAllUsers)
router.get('/students', auth(UserRole.admin), AdminController.getAllStudents)
router.get('/bookings', auth(UserRole.admin), AdminController.getAllBooking)

export const AdminRoutes = router;
