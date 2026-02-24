import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendRespons";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.createUser(req.body)

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User created",
            data: result
        })
    } catch (error) {
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Something went wrong!",
            data: error
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.loginUser(req.body)

        res.cookie("token", result.token, {
            secure: false,
            httpOnly: true,
            sameSite: "strict"
        })

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User logged in successfull",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: error.message,
            data: error
        })
    }
}

export const AuthController = {
    createUser,
    loginUser
};