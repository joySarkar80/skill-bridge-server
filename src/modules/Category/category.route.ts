import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { categoryController } from './category.controller';


const router = express.Router();

router.post('/category', auth(UserRole.admin), categoryController.createCatagory)

export const CategoryRoutes = router;
