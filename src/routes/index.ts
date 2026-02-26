import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { TutorProfileRoutes } from "../modules/Tutor/tutor.routes";

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
];

routerManager.forEach((r) => router.use(r.path, r.route))


export default router;