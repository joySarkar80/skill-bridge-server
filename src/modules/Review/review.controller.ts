import { NextFunction, Request, Response } from "express";
import { ReviewService } from "./review.service";
import sendResponse from "../../utils/sendRespons";

const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ReviewService.createReview(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Review created successfully",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};

const getAllReviewsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const result = await ReviewService.getAllReviewsFromDB(user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All review fetched",
      data: result
    })
  } catch (error) {
    next(error)
  }
};

const getAllReviewsPublicHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ReviewService.getAllReviewsPublic();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All public review fetched",
      data: result
    })
  } catch (error) {
    next(error)
  }
};

export const ReviewController = {
  createReview,
  getAllReviewsHandler,
  getAllReviewsPublicHandler,
};