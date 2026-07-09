import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const createAvailability = async (userId: string, payload: any) => {
    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: { userId },
    });

    if (!tutorProfile) {
        throw new Error("Tutor profile not found");
    }

    const formattedDate = new Date(payload.date);

    try {
        const result =
            await prisma.availability.create({
                data: {
                    tutorId: tutorProfile.id,
                    date: formattedDate,
                    startTime: payload.startTime,
                    endTime: payload.endTime,
                },
            });

        return result;
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new Error(
                "This slot already exists"
            );
        }

        throw error;
    }
};

export const updateAvailability = async (
    id: string,
    payload: any
) => {
    const slot = await prisma.availability.findUnique({
        where: { id },
    });

    if (!slot) {
        throw new Error("Slot not found");
    }

    // 🔥 MAIN LOGIC
    if (slot.isBooked) {
        throw new Error("Booked slot cannot be edited because it is already booked!!");
    }

    const updated = await prisma.availability.update({
        where: { id },
        data: {
            date: new Date(payload.date),
            startTime: payload.startTime,
            endTime: payload.endTime,
        },
    });

    return updated;
};

export const availabilityService = {
    createAvailability,
    updateAvailability
};