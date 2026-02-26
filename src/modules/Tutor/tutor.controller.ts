import { Request, Response } from "express";
import { TutorProfileService } from "./tutor.service";


const createTutorProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const result = await TutorProfileService.createTutorProfile(
      user?.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Tutor profile created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const TutorProfileController = {
  createTutorProfile,
};