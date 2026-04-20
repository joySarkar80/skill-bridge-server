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

  if (booking.status !== "COMPLETED") {
    throw new Error("Review can be submitted only after session completion");
  }

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


const getAllReviewsFromDB = async (user: any) => {
  const { id, role } = user;

  let whereCondition = {};

  if (role === "STUDENT") {
    whereCondition = { studentId: id };
  }

  if (role === "TUTOR") {
    whereCondition = { tutorId: id };
  }

  const reviews = await prisma.review.findMany({
    where: whereCondition,
    include: {
      student: {
        select: { id: true, name: true },
      },
      tutor: {
        select: { id: true, name: true },
      },
      booking: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

const getAllReviewsPublic = async () => {
  const reviews = await prisma.review.findMany({
    include: {
      student: {
        select: { id: true, name: true },
      },
      tutor: {
        select: { id: true, name: true },
      },
      booking: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const ReviewService = {
  createReview,
  getAllReviewsFromDB,
  getAllReviewsPublic
};