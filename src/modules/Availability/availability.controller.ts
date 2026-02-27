import { Request, Response } from "express";
import { availabilityService } from "./availability.service";

const createAvailability = async (req: Request, res: Response) => {
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

export const availabilityController = {
  createAvailability
};