import { Router } from "express";
import { UserController } from "./user.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

router.get("/:id", auth(UserRole.admin, UserRole.student, UserRole.tutor), UserController.getSingleUser);

export const UserRoutes = router;