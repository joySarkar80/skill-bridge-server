import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const getAllStudents = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: "STUDENT",
    },
  });

  return result;
};


const getAllBooking = async () => {
  const result = await prisma.booking.findMany({
    include: {
      student: true, 
      tutor: {
        include: {
          tutorProfile: {
            include: {
              category: true 
            }
          }
        }
      }
    },
  });
  return result;
};

export const AdminService = {
  getAllUsers,
  getAllStudents,
  getAllBooking
};


