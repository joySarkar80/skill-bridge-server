import { prisma } from "../../lib/prisma";

const createBooking = async (
  studentId: string,
  payload: any
) => {
  const existingBooking =
    await prisma.booking.findFirst({
      where: {
        studentId,
        tutorId: payload.tutorId,
        dayOfWeek: payload.dayOfWeek,
        date: payload.date,
        startTime: payload.startTime,
        endTime: payload.endTime,
      },
    });

  if (existingBooking) {
    throw new Error(
      "You already booked this slot"
    );
  }

  const result = await prisma.booking.create({
    data: {
      studentId,
      tutorId: payload.tutorId,
      dayOfWeek: payload.dayOfWeek,
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
    },
  });

  return result;
};

const getBookingsByStudentId = async (studentId: string) => {
  const bookings = await prisma.booking.findMany({
    where: {
      studentId,
    },
    include: {
      tutor: {
        include: {
          tutorProfile: {
            include: {
              category: true, 
            },
          },
        },
      },
    },
  });

  return bookings;
};

export const bookingService = {
  createBooking,
  getBookingsByStudentId,
};