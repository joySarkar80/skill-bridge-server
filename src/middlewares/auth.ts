<<<<<<< HEAD
// import { NextFunction, Request, Response } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken"
// import config from "../config";
// import { prisma } from "../lib/prisma";

// export enum UserRole {
//   student = "STUDENT",
//   tutor = "TUTOR",
//   admin = "ADMIN"
// }

// const auth = (...roles: UserRole[]) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         // console.log(req.headers.cookie);
//         try {
//             const token = req.headers.authorization;

//             // console.log(token);

//             if (!token) {
//                 throw new Error("Token not found!!");
//             }

//             const splitToken = token.split(" ")[1];

//             const decoded = jwt.verify(splitToken, config.jwtSecret as string) as JwtPayload;

//             const userData = await prisma.user.findUnique({
//                 where: {
//                     email: decoded.email,
//                 },
//             });
//             if (!userData) {
//                 throw new Error("Unauthorized!");
//             }

//             if (userData.status !== "ACTIVE") {
//                 throw new Error("Unauthorized!! user status not active");
//             }

//             if (roles.length && !roles.includes(decoded.role)) {
//                 throw new Error("Unauthorized!!!");
//             }

//             req.user = decoded;

//             next();
//         } catch (error: any) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             })
//         }
//     };
// };

// export default auth;




import {
    NextFunction,
    Request,
    Response,
} from "express";
import jwt, {
    JwtPayload,
} from "jsonwebtoken";
=======
import { NextFunction, Request, Response, } from "express";
import jwt, { JwtPayload, } from "jsonwebtoken";
>>>>>>> 928eb9304f1ba3644fc8a72860999ae10e977da0
import config from "../config";
import { prisma } from "../lib/prisma";

export enum UserRole {
    student = "STUDENT",
    tutor = "TUTOR",
    admin = "ADMIN",
}

const auth = (...roles: UserRole[]) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
<<<<<<< HEAD
            // ✅ token from cookie
            const token = req.cookies?.token;

            console.log("cookie token:", token);
=======
            const token = req.cookies?.token;
>>>>>>> 928eb9304f1ba3644fc8a72860999ae10e977da0

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Token not found!!",
                });
            }

            const decoded = jwt.verify(
                token,
                config.jwtSecret as string
            ) as JwtPayload;
<<<<<<< HEAD

            const userData =
                await prisma.user.findUnique({
                    where: {
                        email: decoded.email,
                    },
                });

=======

            const userData = await prisma.user.findUnique({
                where: {
                    email: decoded.email,
                },

            });

>>>>>>> 928eb9304f1ba3644fc8a72860999ae10e977da0
            if (!userData) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized!",
                });
            }

            if (userData.status !== "ACTIVE") {
<<<<<<< HEAD
                return res.status(401).json({
                    success: false,
                    message:
                        "Unauthorized!! user status not active",
                });
            }

            if (
                roles.length &&
                !roles.includes(decoded.role)
            ) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized role",
=======
                return res.status(403).json({
                    success: false,
                    message: "User status not active",
                });
            }

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized!!!",
>>>>>>> 928eb9304f1ba3644fc8a72860999ae10e977da0
                });
            }

            req.user = decoded;

            next();
        } catch (error: any) {
<<<<<<< HEAD
            return res.status(500).json({
                success: false,
                message: error.message,
=======
            return res.status(401).json({
                success: false,
                message:
                    error.message ||
                    "Invalid token",
>>>>>>> 928eb9304f1ba3644fc8a72860999ae10e977da0
            });
        }
    };
};

export default auth;