import { Router } from "express";
import { ReviewController } from "./review.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

router.post("/create", auth(UserRole.student), ReviewController.createReview);
router.get("/private", auth(UserRole.student, UserRole.tutor), ReviewController.getAllReviewsHandler);
router.get("/", ReviewController.getAllReviewsPublicHandler);

export const ReviewRoutes = router;