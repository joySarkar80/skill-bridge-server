import { Request, Response } from "express";
import { availabilityService, updateAvailability } from "./availability.service";

const createAvailability = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const user = req.user;
    const result = await availabilityService.createAvailability(
      user?.id,
      req.body
    );


    res.status(201).json({
      success: true,
      message: "Availability created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const updateAvailabilityHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await updateAvailability(id as string, req.body);

    res.status(200).json({
      success: true,
      message: "Slot updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const availabilityController = {
  createAvailability,
  updateAvailabilityHandler
};