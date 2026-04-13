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

export const AdminService = {
  getAllUsers,
  getAllStudents
};