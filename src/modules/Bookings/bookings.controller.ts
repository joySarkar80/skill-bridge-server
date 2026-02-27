import { Request, Response } from "express";
import { bookingService } from "./bookings.service";

const createBookings = async (req: Request, res: Response) => {
      try {
        const user = req.user;
        const result = await bookingService.createBooking(
          user?.id,
          req.body
        );
    
        res.status(201).json({
          success: true,
          message: "Bookings created successfully",
          data: result,
        });
      } catch (error: any) {
        res.status(400).json({
          success: false,
          message: error.message || "Something went wrong",
        });
      }
};

export const bookingsController = {
    createBookings
}