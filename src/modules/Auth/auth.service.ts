import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../../config";

const createUser = async (payload: any) => {
    const hashPassword = await bcrypt.hash(payload.password, 8);


    const result = await prisma.user.create({
        data: {
            ...payload,
            password: hashPassword
        }
    })
    const { password, ...newResult } = result
    return newResult;
}

const loginUser = async (payload: any) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })

    if (!user) {
        throw new Error("User not found!")
    }
    
    // const match = await bcrypt.compare(pass as string, data.password);

    const isPasswordMatched = await bcrypt.compare(payload.password, user.password)

    if (!isPasswordMatched) {
        throw new Error("Password dont match!");
    }

    const userData = {
        id: user.id,
        name: user.name,
        role: user.role,
        status: user.status,
        email: user.email
    }

    const token = jwt.sign(userData, config.jwtSecret as string, { expiresIn: "1d" })

    return {
        token,
        user
    }


}

export const AuthService = {
    createUser,
    loginUser
};