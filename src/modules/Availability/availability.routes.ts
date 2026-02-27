import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../middlewares/auth";
import { availabilityController } from "./availability.controller";


const router = Router();

router.post(
    "/availability", auth(UserRole.tutor), availabilityController.createAvailability
);

export const AvailabilityRoutes = router;