export class Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, title: string, content: string, authorId: number, published: boolean, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.published = published;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    //validate data
    static validate(data: any): string[] {
        const errors: string[] = [];
        if (!data.title) {
            errors.push('Title is required');
        }
        if (!data.content) {
            errors.push('Content is required');
        }
        if (!data.authorId) {
            errors.push('Author is required');
        }
        return errors;
    }

    static fromJson(json: any): Post {
        return new Post(json.id, json.title, json.content, json.authorId, json.published, json.createdAt, json.updatedAt);
    }

    toJson(): any {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            authorId: this.authorId,
            published: this.published,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    static fromPrismaJson(json: any): Post {
        return new Post(json.id, json.title, json.content, json.authorId, json.published, json.createdAt, json.updatedAt);
    }

    toPrismaJson(): any {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            authorId: this.authorId,
            published: this.published,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    static fromPrismaJsonArray(jsonArray: any[]): Post[] {
        return jsonArray.map((json) => Post.fromPrismaJson(json));
    }

    static fromJsonArray(jsonArray: any[]): Post[] {
        return jsonArray.map((json) => Post.fromJson(json));
    }

    static fromPrismaJsonArrayToPrismaJson(jsonArray: any[]): any[] {
        return jsonArray.map((json) => Post.fromPrismaJson(json).toPrismaJson());
    }

    static fromJsonArrayToPrismaJson(jsonArray: any[]): any[] {
        return jsonArray.map((json) => Post.fromJson(json).toPrismaJson());
    }

    static fromPrismaJsonToPrismaJson(json: any): any {
        return Post.fromPrismaJson(json).toPrismaJson();
    }

}