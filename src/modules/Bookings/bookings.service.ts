import { prisma } from "../../lib/prisma";

const createBooking = async (
  studentId: string,
  payload: any
) => {
  const tutorProfile =
    await prisma.tutorProfile.findUnique({
      where: {
        userId: payload.tutorId,
      },
    });

  if (!tutorProfile) {
    throw new Error("Tutor not found");
  }

  // exact slot check
  const existingBooking =
    await prisma.booking.findFirst({
      where: {
        tutorId: payload.tutorId,
        dayOfWeek: payload.dayOfWeek,
        date: payload.date,
        startTime: payload.startTime,
        endTime: payload.endTime,
      },
    });

  if (existingBooking) {
    throw new Error(
      "This slot is already booked"
    );
  }

  const result =
    await prisma.booking.create({
      data: {
        studentId,
        tutorId: payload.tutorId,
        dayOfWeek:
          payload.dayOfWeek,
        date: payload.date,
        startTime:
          payload.startTime,
        endTime:
          payload.endTime,
      },
    });

  return result;
};

export const bookingService = {
  createBooking,
};