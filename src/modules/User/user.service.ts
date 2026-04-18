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

const updateUserStatus = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const newStatus =
        user.status === "ACTIVE" ? "BANNED" : "ACTIVE";

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            status: newStatus,
        },
    });

    return updatedUser;
};

export const UserService = {
    getSingleUser,
    updateUserStatus
};