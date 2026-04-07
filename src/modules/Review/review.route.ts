import { Router } from "express";
import { ReviewController } from "./review.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

// router.post("/create", ReviewController.createReview);

router.post(
    "/create", auth(UserRole.student), ReviewController.createReview
);

export const ReviewRoutes = router;