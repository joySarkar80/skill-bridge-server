import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../middlewares/auth";
import { TutorProfileController } from "./tutor.controller";

const router = Router();

router.post(
    "/profile", auth(UserRole.tutor), TutorProfileController.createTutorProfile
);

router.get("/tutors", auth(UserRole.admin), TutorProfileController.getAllTutors);

router.get("/:id", TutorProfileController.getSingleTutor);


export const TutorProfileRoutes = router;