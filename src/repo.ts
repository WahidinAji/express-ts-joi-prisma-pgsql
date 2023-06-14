import prisma from './model';
import { User } from '@prisma/client';

export async function checkUserExists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    return user !== null;
}

export async function createUser(firstName: string, lastName: string, email: string, password: string): Promise<User> {
    const user = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
    });
    return user;
}

export async function findAll(): Promise<User[]> {
    const allUsers = await prisma.user.findMany();
    return allUsers;
}
export default {
    checkUserExists,
    createUser,
    findAll,
}