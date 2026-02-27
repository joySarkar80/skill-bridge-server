import { prisma } from "../../lib/prisma";

const createBooking = async (studentId: string, payload: any) => {

  // find tutor profile
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId: payload.tutorId }
  });

  if (!tutorProfile) {
    throw new Error("Tutor not found");
  }

  // check availability
  // const availability = await prisma.availability.findFirst({
  //   where: {
  //     tutorId: tutorProfile.id,
  //     dayOfWeek: payload.dayOfWeek
  //   }
  // });

  // if (!availability) {
  //   throw new Error("Tutor not available on this day");
  // }

  // simple booking create
  const result = await prisma.booking.create({
    data: {
      studentId,
      tutorId: payload.tutorId,
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
    }
  });

  return result;
};

export const bookingService = {
  createBooking
};