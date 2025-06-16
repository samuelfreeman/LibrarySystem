import { PrismaClient } from "@prisma/client";
import { loginAdmin, SavedAdmin } from "@server/types/Admin";
import { hashPassword, verifyPassword } from "@server/Utils/bcrypt";
import { generateOTP } from "@server/Utils/generateOTP";
import { RegisterAdminInput } from "@server/validators/admin.validator";

const prisma = new PrismaClient();
const registerAdmin = async (input: RegisterAdminInput): Promise<SavedAdmin> => {
    const hashedPassword = await hashPassword(input.password);

    const emailAdmin = await prisma.admin.findUnique({
        where: {
            email: input.email,
        },
    });
    if (emailAdmin) {
        throw new Error("Admin with this email already exists");
    }
    const usedUsername = await prisma.admin.findUnique({
        where: {
            username: input.username,
        },
    });
    if (usedUsername) {
        throw new Error("Admin with this username already exists");
    }


    const admin = await prisma.admin.create({
        data: {
            ...input,
            password: hashedPassword,
            otp: 0
        },
    });
    return admin as SavedAdmin;
};

const login = async (input: loginAdmin): Promise<SavedAdmin> => {
    const otp = generateOTP()

    const admin = await prisma.admin.findUnique({
        where: {
            username: input.username,
        },
    });
    if (!admin) {
        throw new Error("Admin not found");
    }

    const password = await verifyPassword(input.password, admin.password)
    if (!password) {
        throw new Error("Invalid password")
    }
   const updateOTP =  await prisma.admin.update({
        where: {
            id: admin.id
        },
        data: {
            otp: otp
        }
    })
    if (!updateOTP) {
        throw new Error("Failed to update OTP")
    }

    return updateOTP as SavedAdmin;
};

const verifyAdminOtp = async (otp: number, username: string): Promise<SavedAdmin> => {
    const admin = await prisma.admin.findUnique({
        where: {
            username: username,
        },
    });
    if (!admin) {
        throw new Error("Admin not found");
    }
     console.log(  admin.otp , otp)
    if (admin.otp !== otp) {
        throw new Error("Invalid OTP");
    }
    return admin as SavedAdmin;
};

export { registerAdmin, login , verifyAdminOtp};

