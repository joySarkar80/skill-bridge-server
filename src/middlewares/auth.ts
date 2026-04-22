import { NextFunction, Request, Response, } from "express";
import jwt, { JwtPayload, } from "jsonwebtoken";
import config from "../config";
import { prisma } from "../lib/prisma";

export enum UserRole {
    student = "STUDENT",
    tutor = "TUTOR",
    admin = "ADMIN",
}

const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies?.token;

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

            const userData = await prisma.user.findUnique({
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
                return res.status(403).json({
                    success: false,
                    message: "User status not active",
                });
            }

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized!!!",
                });
            }

            req.user = decoded;

            next();
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                message:
                    error.message ||
                    "Invalid token",
            });
        }
    };
};

export default auth;