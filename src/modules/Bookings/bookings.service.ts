import { prisma } from "../../lib/prisma";

const createBooking = async (
  studentId: string,
  payload: any
) => {
<<<<<<< HEAD
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
=======
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

// const updateBookingStatus = async (bookingId: string, tutorId: string) => {
//   const booking = await prisma.booking.findUnique({
//     where: { id: bookingId },
//   });

//   if (!booking) {
//     throw new Error("Booking not found");
//   }

//   if (booking.tutorId !== tutorId) {
//     throw new Error("Unauthorized");
//   }

//   if (booking.status !== "CONFIRMED") {
//     throw new Error("Only confirmed bookings can be completed");
//   }

//   const result = await prisma.booking.update({
//     where: { id: bookingId },
//     data: {
//       status: "COMPLETED",
//     },
//   });

//   return result;
// };

const updateBookingStatus = async (
  bookingId: string,
  userId: string,
  role: "STUDENT" | "TUTOR"
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // 🔐 Authorization check
  if (role === "TUTOR" && booking.tutorId !== userId) {
    throw new Error("Unauthorized (Tutor)");
  }

  if (role === "STUDENT" && booking.studentId !== userId) {
    throw new Error("Unauthorized (Student)");
  }

  // 🔥 Status logic
  if (booking.status !== "CONFIRMED") {
    throw new Error("Only confirmed bookings can be updated");
  }

  let newStatus: "COMPLETED" | "CANCELLED";

  if (role === "TUTOR") {
    newStatus = "COMPLETED";
  } else if (role === "STUDENT") {
    newStatus = "CANCELLED";
  } else {
    throw new Error("Invalid role");
  }

  const result = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: newStatus,
    },
  });
>>>>>>> 928eb9304f1ba3644fc8a72860999ae10e977da0

  return result;
};

export const bookingService = {
  createBooking,
<<<<<<< HEAD
=======
  getBookingsByStudentId,
  getTutorBookings,
  updateBookingStatus,
>>>>>>> 928eb9304f1ba3644fc8a72860999ae10e977da0
};