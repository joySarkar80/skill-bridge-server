import { NextFunction, Request, Response } from "express";
import { TutorProfileService } from "./tutor.service";
import sendResponse from "../../utils/sendRespons";

const createTutorProfile = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req);
  try {
    const user = req.user;
    const result = await TutorProfileService.createTutorProfile(user?.id, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Profile created",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};

const getAllTutorProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TutorProfileService.getAllTutorProfile();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All tutor profile fetched",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
}

const getAllTutors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TutorProfileService.getAllTutors();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All tutor fetched",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};

const getSingleTutorProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const result = await TutorProfileService.getSingleTutorProfile(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single tutor profile fetched",
      data: result
    })
  } catch (error) {
    next(error)
  }
};

const updateTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
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

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile updated successfully",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};

const getTutorsByCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await TutorProfileService.getTutorsByCategory(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All Tutor fetched by category",
      data: result
    })
  } catch (error) {
    next(error)
  }
};

export const TutorProfileController = {
  createTutorProfile,
  getAllTutorProfile,
  getSingleTutorProfile,
  getAllTutors,
  updateTutorProfile,
  getTutorsByCategoryHandler
};