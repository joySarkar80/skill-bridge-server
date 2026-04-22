import { NextFunction, Request, Response } from "express";
import { availabilityService, updateAvailability } from "./availability.service";
import sendResponse from "../../utils/sendRespons";

const createAvailability = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.body);
  try {
    const user = req.user;
    const result = await availabilityService.createAvailability(
      user?.id,
      req.body
    );


    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Availability Created",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};

const updateAvailabilityHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await updateAvailability(id as string, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Slot Updated successfully",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};

export const availabilityController = {
  createAvailability,
  updateAvailabilityHandler
};