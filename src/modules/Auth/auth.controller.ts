import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendRespons";

<<<<<<< HEAD
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

// const loginUser = async (req: Request, res: Response) => {
//     try {
//         const result = await AuthService.loginUser(req.body)

//         res.cookie("token", result.token, {
//             secure: false,
//             httpOnly: true,
//             sameSite: "strict"
//         })

//         sendResponse(res, {
//             statusCode: 201,
//             success: true,
//             message: "User logged in successfull",
//             data: result
//         })
//     } catch (error: any) {
//         sendResponse(res, {
//             statusCode: 400,
//             success: false,
//             message: error.message,
//             data: error
//         })
//     }
// }

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUser(req.body);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
        token: result.token, // VERY IMPORTANT
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
=======
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AuthService.createUser(req.body)

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User created",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AuthService.loginUser(req.body)

        res
            .cookie("token", result.token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            })
            .status(201)
            .json({
                success: true,
                message: "User logged in successfully",
                data: result,
            });
    } catch (error: any) {
        next(error)
    }
}
>>>>>>> 928eb9304f1ba3644fc8a72860999ae10e977da0

export const AuthController = {
  createUser,
  loginUser,
  logoutUser
};