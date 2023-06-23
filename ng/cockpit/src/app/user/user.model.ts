export interface UserList {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  username: string;
}
