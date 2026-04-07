import { prisma } from "../../lib/prisma";

type ReviewPayload = {
  bookingId: string;
  studentId: string;
  tutorId: string;
  rating: number;
  comment?: string;
};

const createReview = async (payload: ReviewPayload) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: payload.bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Optional but strongly recommended
  if (booking.status !== "COMPLETED") {
    throw new Error("Review can be submitted only after session completion");
  }

  // prevent duplicate review
  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId: payload.bookingId,
    },
  });

  if (existingReview) {
    throw new Error("Review already submitted for this booking");
  }

  const result = await prisma.review.create({
    data: {
      bookingId: payload.bookingId,
      studentId: payload.studentId,
      tutorId: payload.tutorId,
      rating: payload.rating,
      comment: payload.comment,
    },
    include: {
      student: true,
      tutor: true,
      booking: true,
    },
  });

  return result;
};

export const ReviewService = {
  createReview,
};