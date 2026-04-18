import { Router } from "express";
import { ReviewController } from "./review.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

router.post("/create", auth(UserRole.student), ReviewController.createReview);
router.get("/", auth(UserRole.student), ReviewController.getAllReviewsHandler);

export const ReviewRoutes = router;