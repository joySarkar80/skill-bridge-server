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

const getBookingsByStudentId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await bookingService.getBookingsByStudentId(id as string);

    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


const getTutorBookingsHandler = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    // console.log(user)

    const result = await bookingService.getTutorBookings(user?.id);

    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


const updateBookingStatusHandler = async (req: Request, res: Response) => {
  try {
    const user = req.user; 
    const bookingId = req.params.id;

    const result = await bookingService.updateBookingStatus(bookingId as string, user?.id);

    res.json({
      success: true,
      message: "Booking marked as completed",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


export const bookingsController = {
  createBookings,
  getBookingsByStudentId,
  getTutorBookingsHandler,
  updateBookingStatusHandler,
}