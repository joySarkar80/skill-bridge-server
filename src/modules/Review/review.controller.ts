import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.createReview(req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const getAllReviewsHandler = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    console.log("User from request:", user);  
    const result = await ReviewService.getAllReviewsFromDB(req.user);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

export const ReviewController = {
  createReview,
  getAllReviewsHandler,
};