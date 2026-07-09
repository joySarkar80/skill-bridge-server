import { Router } from "express";
import { UserController } from "./user.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

router.get("/:id", auth(UserRole.admin, UserRole.student, UserRole.tutor), UserController.getSingleUser);

router.patch("/:id", auth(UserRole.admin), UserController.updateUserStatusHandler);

export const UserRoutes = router;