import { Post } from './post';
import { User } from './user';

export interface Comment {
  content: string;
  _id: string;
  user: User;
  post: Post;
  createdAt?: Date;
  updatedAt?: Date;
}
