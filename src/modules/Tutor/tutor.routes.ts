import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../middlewares/auth";
import { TutorProfileController } from "./tutor.controller";

const router = Router();

router.post(
    "/profile", auth(UserRole.tutor), TutorProfileController.createTutorProfile
);

export const TutorProfileRoutes = router;