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
            // ✅ token from cookie
            const token = req.cookies?.token;

            console.log("cookie token:", token);

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

            const userData =
                await prisma.user.findUnique({
                    where: {
                        email: decoded.email,
                    },
                });

            if (!userData) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized!",
                });
            }

            if (userData.status !== "ACTIVE") {
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
                });
            }

            req.user = decoded;

            next();
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
};

export default auth;