import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../middlewares/auth";
import { bookingsController } from "./bookings.controller";

const router = Router();

router.post(
    "/", auth(UserRole.student), bookingsController.createBookings
);

router.get(
    "/:id", auth(UserRole.student), bookingsController.getBookingsByStudentId
);

export const BookingsRoutes = router;