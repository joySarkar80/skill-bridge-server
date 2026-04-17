import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../middlewares/auth";
import { TutorProfileController } from "./tutor.controller";

const router = Router();

// create tutor profile..
router.post("/profile", auth(UserRole.tutor), TutorProfileController.createTutorProfile);

// update tutor profile..
router.put("/profile", auth(UserRole.tutor), TutorProfileController.updateTutorProfile)

// get all tutor profile..  
router.get("/", TutorProfileController.getAllTutorProfile);

// get all tutors for admin, not tutor profile..
router.get("/tutors", auth(UserRole.admin), TutorProfileController.getAllTutors);

// get single tutor profile..
router.get("/:id", TutorProfileController.getSingleTutorProfile);


export const TutorProfileRoutes = router;