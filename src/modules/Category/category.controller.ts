import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCatagory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.createCategory(req.body);

    res.status(200).json({
      success: true,
      message: "Category create successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error,
    });
  }

// console.log(req.body);
};

export const categoryController = {
    createCatagory
}