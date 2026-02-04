export interface Student {
  id: number;
  name: string;
  course: string;
  year: number;
  email?: string;
}

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  username: string;
}
