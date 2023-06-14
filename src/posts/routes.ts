//write routing logic here

// Path: src/posts/routes.ts

import express from 'express';
import { Request, Response } from 'express';
import { createPost, findAll } from './service';
import Joi from 'joi';

const postValidation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    userId: Joi.string().required()
});

const router = express.Router();

router.post('/posts', async (req: Request, res: Response) => {
    try {
        const { title, content, userId } = req.body;
        const data = {
            title: title,
            content: content,
            userId: userId
        }
        const { error } = postValidation.validate(data);
        if (error) {
            const errorMessages = error.details.map((err) => err.message);
            return res.status(400).json({ errors: errorMessages });
        }
        const newPost = await createPost(data.title, data.content, data.userId);
        res.json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/posts', async (req: Request, res: Response) => {
    try {
        const posts = await findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;