import axios from 'axios';

const JSONPLACEHOLDER_API = 'https://jsonplaceholder.typicode.com';

export interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export interface Student {
  id: number;
  name: string;
  course: string;
  year: number;
}

export const studentService = {
  /**
   * Fetch all students from JSONPlaceholder API
   * Transforms user data into student format
   */
  async getAll(): Promise<Student[]> {
    // Fetch from users endpoint
    const usersResponse = await axios.get<User[]>(`${JSONPLACEHOLDER_API}/users`);
    
    const users = usersResponse.data;
    const students: Student[] = [];
    
    // Create 50 students by repeating and modifying the 10 users
    for (let i = 0; i < 5; i++) {
      users.forEach((user) => {
        const studentId = (i * 10) + user.id;
        students.push({
          id: studentId,
          name: i === 0 ? user.name : `${user.name} ${String.fromCharCode(65 + i)}`,
          course: user.company.name,
          year: ((studentId - 1) % 4) + 1, // Distribute years 1-4
        });
      });
    }
    
    return students;
  },

  /**
   * Fetch a single student by ID
   */
  async getById(id: number): Promise<Student> {
    const response = await axios.get<User>(`${JSONPLACEHOLDER_API}/users/${id}`);
    
    return {
      id: response.data.id,
      name: response.data.name,
      course: response.data.company.name,
      year: Math.floor(Math.random() * 4) + 1,
    };
  },
};
