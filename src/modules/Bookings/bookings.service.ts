import { prisma } from "../../lib/prisma";

const createBooking = async (
  studentId: string,
  payload: any
) => {
  const existingBooking =
    await prisma.booking.findFirst({
      where: {
        availabilityId: payload.availabilityId,
        studentId,
        tutorId: payload.tutorId,
        categoryId: payload.categoryId,
        categoryName: payload.categoryName,
        hourlyRate: payload.hourlyRate,
        tutorName: payload.tutorName,
        date: new Date(payload.date),
        startTime: payload.startTime,
        endTime: payload.endTime,
      },
    });

  if (existingBooking) {
    throw new Error(
      "You already booked this slot"
    );
  }

  const slotId = payload.availabilityId;
  console.log(slotId);

  const slot = await prisma.availability.findUnique({
    where: { id: slotId },
  });

  if (!slot) {
    throw new Error("Slot not found");
  }

  if (slot.isBooked) {
    throw new Error("Slot already booked");
  }

  const result = await prisma.booking.create({
    data: {
      availabilityId: payload.availabilityId,
      studentId,
      tutorId: payload.tutorId,
      categoryId: payload.categoryId,
      categoryName: payload.categoryName,
      hourlyRate: payload.hourlyRate,
      tutorName: payload.tutorName,
      date: new Date(payload.date),
      startTime: payload.startTime,
      endTime: payload.endTime,
    },
  });

  await prisma.availability.update({
    where: { id: slotId },
    data: {
      isBooked: true,
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


const getTutorBookings = async (tutorId: string) => {
  return await prisma.booking.findMany({
    where: { tutorId },
    include: {
      student: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateBookingStatus = async (bookingId: string, tutorId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // 🔒 Security: tutor only update his booking
  if (booking.tutorId !== tutorId) {
    throw new Error("Unauthorized");
  }

  // শুধু CONFIRMED → COMPLETED allow
  if (booking.status !== "CONFIRMED") {
    throw new Error("Only confirmed bookings can be completed");
  }

  const result = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "COMPLETED",
    },
  });

  return result;
};

export const bookingService = {
  createBooking,
  getBookingsByStudentId,
  getTutorBookings,
  updateBookingStatus,
};