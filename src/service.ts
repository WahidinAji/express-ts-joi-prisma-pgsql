import prisma from './model';
import { User } from '@prisma/client';
import userValidation from './validation';
import repo from './repo';

export async function createUser(firstName: string, lastName: string, email: string, password: string): Promise<User> {

    //const u = new User(user.firstName, user.lastName, user.email, user.password, user.avatar);

    // const data = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     password: password
    // }
    // const { error } = userValidation.validate(data);
    // console.log(error, "error");
    // if (error) {
    //     var errorMessages: string[] = [];
    //     error.details.forEach((err) => {
    //         errorMessages.push(err.message);
    //     });
    //     throw new Error(errorMessages.join(','));
    //     // console.log(error, "error");
    //     // const errorMessages = error.details.map((err) => err.message);
    //     throw new Error(errorMessages.join(','));
    // }

    // const userData = await repo.createUser(firstName, lastName, email, password);
    // return userData;
    try {
        const userExists = await repo.checkUserExists(email);
        console.log(userExists, "userExists");
        if (userExists) {
            throw new Error('UserAlreadyExists');
        }
        // return userData;
        const newUser = await repo.createUser(firstName, lastName, email, password);
        return newUser;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('UnknownError');
    }
}

export async function findAll(): Promise<User[]> {
    const allUsers = await prisma.user.findMany();
    return allUsers;
}

export default {
    createUser,
    findAll,
};