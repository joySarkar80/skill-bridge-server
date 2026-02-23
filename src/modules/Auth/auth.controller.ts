import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { AuthService } from "./auth.service";
import { success } from "zod";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.createUser(req.body)
        res.status(201).json({
            success: true,
            message: "User create",
            data: result
        })
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.loginUser(req.body)
        res.status(200).json({
            success: true,
            message: "User create",
            data: result
        })
    } catch (error) {
        console.log(error);
    }
}

export const AuthController = {
    createUser,
    loginUser
};