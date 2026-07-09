import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import sendResponse from "../../utils/sendRespons";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminService.getAllUsers();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All user fetched",
      data: result
    })
  } catch (error) {
    next(error)
  }
};

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminService.getAllStudents();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All students fetched",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};

const getAllBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminService.getAllBooking();

     sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking retruved successfully",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};

export const AdminController = {
  getAllUsers,
  getAllStudents,
  getAllBooking
};