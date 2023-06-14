// Path: src/posts/service.ts
import { PrismaClient } from '@prisma/client';
import { Post } from './post';

const prisma = new PrismaClient();

export async function createPost(title: string, content: string, userId: string): Promise<Post> {
    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            authorId: userId
        }
    })
    // return post as Post;
    return Post.fromPrismaJson(post);
}

export async function findAll(): Promise<Post[]> {
    const allPosts = await prisma.post.findMany();
    return allPosts.map((post) => Post.fromPrismaJson(post));
}

// export default {
//     createPost,
//     findAll,
// };
