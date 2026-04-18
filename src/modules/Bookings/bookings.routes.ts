import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../middlewares/auth";
import { bookingsController } from "./bookings.controller";

const router = Router();

router.post("/", auth(UserRole.student), bookingsController.createBookings);

router.get("/tutor", auth(UserRole.tutor), bookingsController.getTutorBookingsHandler);

router.get("/:id", auth(UserRole.student), bookingsController.getBookingsByStudentId);

router.patch("/:id/status", auth(UserRole.tutor), bookingsController.updateBookingStatusHandler);


export const BookingsRoutes = router;