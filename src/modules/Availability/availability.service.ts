import { prisma } from "../../lib/prisma";

const createAvailability = async (userId: string, payload: any) => {
    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: { userId }
    });

    if (!tutorProfile) {
        throw new Error("Tutor profile not found");
    }

    const result = await prisma.availability.create({
        data: {
            tutorId: tutorProfile.id,
            dayOfWeek: payload.dayOfWeek,
            startTime: payload.startTime,
            endTime: payload.endTime
        }
    });

    return result;
};

export const availabilityService = {
    createAvailability
};