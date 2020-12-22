export interface User {
  email: string;
  username: string;
  role: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
  followers: string[] | User[];
  following: string[] | User[];
  avatar: string;
}
