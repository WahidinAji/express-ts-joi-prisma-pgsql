import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar?: string;

    constructor(firstName: string, lastName: string, email: string, password: string, avatar?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
    }
}

export default prisma;
