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
        path: "/categories",
        route: CategoryRoutes
    },
    {
        // create, update and get single tutor profile..
        path: "/tutor",
        route: TutorProfileRoutes
    },
    {
        // get all tutors for admin, not tutor profile..
        path: "/admin",
        route: TutorProfileRoutes
    },
    {
        // get all tutor profile..
        path: "/tutors",
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
        // this route provid single user date from user table..
        path: "/me",
        route: UserRoutes
    },
    {
        // this route provid single user ban unban..
        path: "/user",
        route: UserRoutes
    },
];

routerManager.forEach((r) => router.use(r.path, r.route))


export default router;