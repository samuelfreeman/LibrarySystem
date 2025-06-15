import { PrismaClient } from "@prisma/client";
import { SavedAdmin } from "@server/types/Admin";
import { hashPassword } from "@server/Utils/bcrypt";
import ExpressRes from "@server/Utils/Res";
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


export { registerAdmin };

