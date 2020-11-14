import { Comment } from './comment';
import { User } from './user';

export interface Post {
    comments: Comment[];
    content: string;
    title: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
    user: User;
    _id: string;
    favorites: string[];
}
