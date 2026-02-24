import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
import { prisma } from "../lib/prisma";

export enum UserRole {
  student = "STUDENT",
  tutor = "TUTOR",
  admin = "ADMIN"
}

const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            console.log(token);

            if (!token) {
                throw new Error("Token not found!!");
            }

            const splitToken = token.split(" ")[1];

            const decoded = jwt.verify(splitToken, config.jwtSecret as string) as JwtPayload;

            const userData = await prisma.user.findUnique({
                where: {
                    email: decoded.email,
                },
            });
            if (!userData) {
                throw new Error("Unauthorized!");
            }

            if (userData.status !== "ACTIVE") {
                throw new Error("Unauthorized!! user status not active");
            }

            if (roles.length && !roles.includes(decoded.role)) {
                throw new Error("Unauthorized!!!");
            }

            req.user = decoded;

            next();
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    };
};

export default auth;