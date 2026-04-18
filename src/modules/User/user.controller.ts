import { Request, Response } from "express";
import { UserService } from "./user.service";

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result =
      await UserService.getSingleUser(id as string);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateUserStatusHandler = async (req: Request, res: Response) => {
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
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const UserController = {
  getSingleUser,
  updateUserStatusHandler
};