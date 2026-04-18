import { prisma } from "../../lib/prisma";

interface ITutorProfilePayload {
    bio?: string;
    hourlyRate: number;
    experience?: number;
    categoryId: string;
}

const createTutorProfile = async (userId: string, payload: ITutorProfilePayload) => {
    const { bio, hourlyRate, experience, categoryId } = payload;
    // console.log(payload);

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

const getAllTutorProfile = async () => {
    const tutors = await prisma.tutorProfile.findMany({
        include: {
            user: true,
            category: true,
        }
    });

    return tutors;
}

export const getAllTutors = async () => {
    const result = await prisma.user.findMany({
        where: {
            role: "TUTOR",
        },
    });

    return result;
};

const getSingleTutorProfile = async (id: string) => {
    const tutor = await prisma.tutorProfile.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            category: true,
            availability: {
                where: {
                    isBooked: false,
                }
            },
        },
    });

    if (!tutor) {
        throw new Error("Tutor not found");
    }

    const reviews = await prisma.review.findMany({
        where: {
            tutorId: tutor.userId,
        },
        include: {
            student: true,
            tutor: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return {
        ...tutor,
        reviews,
    };
};

const updateTutorProfile = async (
    userId: string,
    payload: {
        bio: string;
        hourlyRate: number;
        experience: number;
        categoryId: string;
    }
) => {
    const existingProfile =
        await prisma.tutorProfile.findUnique({
            where: { userId },
        });

    if (!existingProfile) {
        throw new Error("Tutor profile not found");
    }

    return prisma.tutorProfile.update({
        where: { userId },
        data: payload,
        include: {
            category: true,
        },
    });
};


export const TutorProfileService = {
    createTutorProfile,
    getAllTutorProfile,
    getSingleTutorProfile,
    getAllTutors,
    updateTutorProfile,
};