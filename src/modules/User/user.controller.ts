import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendRespons";

const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result =
      await UserService.getSingleUser(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single user fetched",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};


const updateUserStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await UserService.updateUserStatus(id as string);

    res.status(200).json({
      success: true,
      message:
        result.status === "BANNED"
          ? "User banned successfully"
          : "User unbanned successfully",
      data: result,
    });
  } catch (error: any) {
    next(error)
  }
};

export const UserController = {
  getSingleUser,
  updateUserStatusHandler
};