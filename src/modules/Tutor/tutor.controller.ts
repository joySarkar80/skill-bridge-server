import { Request, Response } from "express";
import { TutorProfileService } from "./tutor.service";
import sendResponse from "../../utils/sendRespons";


const createTutorProfile = async (req: Request, res: Response) => {
  // console.log(req);
  try {
    const user = req.user;
    const result = await TutorProfileService.createTutorProfile(
      user?.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const getAllTutorProfile = async (req: Request, res: Response) => {
  try {
    const result = await TutorProfileService.getAllTutorProfile();
    res.status(201).json({
      success: true,
      message: "Retrive all tutor successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "cant retrive tutor profiles!",
    });
  }
}

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const result = await TutorProfileService.getAllTutors();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Tutors retrieved successfully",
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

const getSingleTutorProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const result = await TutorProfileService.getSingleTutorProfile(id as string);

    res.status(200).json({
      success: true,
      message: "Tutor profile fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const updateTutorProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result =
      await TutorProfileService.updateTutorProfile(
        userId,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to update profile",
    });
  }
};
export const TutorProfileController = {
  createTutorProfile,
  getAllTutorProfile,
  getSingleTutorProfile,
  getAllTutors,
  updateTutorProfile,
};