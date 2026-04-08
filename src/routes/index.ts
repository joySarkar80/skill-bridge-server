import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { TutorProfileRoutes } from "../modules/Tutor/tutor.routes";
import { AvailabilityRoutes } from "../modules/Availability/availability.routes";
import { BookingsRoutes } from "../modules/Bookings/bookings.routes";
import { ReviewRoutes } from "../modules/Review/review.route";
import { UserRoutes } from "../modules/User/user.route";

const router = Router();

// router.use('/auth', AuthRoutes)
// router.use('/admin', AdminRoutes)

const routerManager = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/admin",
        route: AdminRoutes
    },
    {
        path: "/admin",
        route: CategoryRoutes
    },
    {
        path: "/tutor",
        route: TutorProfileRoutes
    },
    {
        path: "/tutor",
        route: AvailabilityRoutes
    },
    {
        path: "/bookings",
        route: BookingsRoutes
    },
    {
        path: "/review",
        route: ReviewRoutes
    },
    {
        path: "/me",
        route: UserRoutes
    },
];

routerManager.forEach((r) => router.use(r.path, r.route))


export default router;