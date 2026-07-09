import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendRespons";

const createCatagory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CategoryService.createCategory(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Category created",
      data: result
    })
  } catch (error) {
    next(error)
  }
};


const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CategoryService.getAllCategory();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category all fetched",
      data: result
    })
  } catch (error) {
    next(error)
  }
};

export const categoryController = {
  createCatagory,
  getAllCategory
}