import express, { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import userValidation from './validation';
import service from './service';
import e from 'express';

const prisma = new PrismaClient();
const router = express.Router();



router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/users', async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const data = {
            firstName: first_name,
            lastName: last_name,
            email: email,
            password: password
        };
        const { error } = userValidation.validate(data);
        console.log(error, "error")
        if (error) {
            const errorMessages = error.details.map((err) => err.message);
            return res.status(400).json({ errors: errorMessages });
        }
        // var errorMessages: string[] = [];
        // if (!first_name) {
        //     errorMessages.push('First name is required.');
        // }
        // if (!last_name) {
        //     errorMessages.push('Last name is required.');
        // }
        // if (!email) {
        //     errorMessages.push('Email is required.');
        // }
        // if (!password) {
        //     errorMessages.push('Password is required.');
        // }
        // if (errorMessages.length > 0) {
        //     return res.status(400).json({ errors: errorMessages });
        // }
        // return res.json(data);
        const newUser = await service.createUser(data.firstName, data.lastName, data.email, data.password);
        res.json(newUser);

    } catch (error) {
        // if (error instanceof Error) {
        //     var errorMessages: string[] = [];
        //     if (error.message === 'UserAlreadyExists') {
        //         errorMessages.push('User already exists.');
        //         return res.status(400).json({ errors: errorMessages });
        //     }
        //     errorMessages.push(error.message);
        //     return res.status(400).json({ errors: errorMessages });
        // }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;
