import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllStudents();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Students retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      error: error,
    });
  }
};

export const AdminController = {
  getAllUsers,
  getAllStudents
};