import { prisma } from "../../lib/prisma";

const getSingleUser = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            tutorProfile: {
                include: {
                    category: true,
                    availability: true,
                },
            },
            studentBookings: true,
            tutorBookings: true,
            reviewsGiven: true,
            reviewsReceived: true,
        },
    });

    if (!result) {
        throw new Error("User not found");
    }

    return result;
};

export const UserService = {
    getSingleUser,
};