import { NextFunction, Request, Response } from "express";
import { bookingService } from "./bookings.service";
import sendResponse from "../../utils/sendRespons";

const createBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const result = await bookingService.createBooking(
      user?.id,
      req.body
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booking Created",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};

const getBookingsByStudentId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await bookingService.getBookingsByStudentId(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking retrived",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};


const getTutorBookingsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    // console.log(user)

    const result = await bookingService.getTutorBookings(user?.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tutor Booking retrived",
      data: result
    })
  } catch (err: any) {
    next(err)
  }
};


const updateBookingStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const result = await bookingService.updateBookingStatus(
      id as string,
      user?.id,
      user?.role
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking status updated",
      data: result
    })
  } catch (error: any) {
    next(error)
  }
};


export const bookingsController = {
  createBookings,
  getBookingsByStudentId,
  getTutorBookingsHandler,
  updateBookingStatusHandler,
}