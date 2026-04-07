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

const getAllTutor = async (req: Request, res: Response) => {
  try {
    const result = await TutorProfileService.getAllTutor();
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

const getSingleTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await TutorProfileService.getSingleTutor(id as string);

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

export const TutorProfileController = {
  createTutorProfile,
  getAllTutor,
  getSingleTutor
};