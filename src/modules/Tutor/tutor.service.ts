import { prisma } from "../../lib/prisma";

interface ITutorProfilePayload {
    bio?: string;
    hourlyRate: number;
    experience?: number;
    categoryId: string;
}

const createTutorProfile = async (userId: string, payload: ITutorProfilePayload) => {
    const { bio, hourlyRate, experience, categoryId } = payload;

    const existingProfile = await prisma.tutorProfile.findUnique({
        where: { userId },
    });

    if (existingProfile) {
        throw new Error("Tutor profile already exists");
    }

    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });

    if (!category) {
        throw new Error("Category not found");
    }

    const result = await prisma.tutorProfile.create({
        data: {
            userId,
            bio,
            hourlyRate,
            experience,
            categoryId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            category: true,
        },
    });

    return result;
};

const getAllTutor = async () => {
    const tutors = await prisma.tutorProfile.findMany({
        include: {
            user: true,
            category: true,
        }
    });

    return tutors;
}

const getSingleTutor = async (id: string) => {
    const result = await prisma.tutorProfile.findUnique({
        where: { id },
        include: {
            user: true,
            category: true,
        },
    });

    if (!result) {
        throw new Error("Tutor not found");
    }

    return result;
};

export const TutorProfileService = {
    createTutorProfile,
    getAllTutor,
    getSingleTutor
};