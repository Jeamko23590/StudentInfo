import axios, { AxiosError } from 'axios';

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

export class StudentServiceError extends Error {
  constructor(
    message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'StudentServiceError';
  }
}

const handleApiError = (error: unknown, context: string): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response) {
      // Server responded with error status
      throw new StudentServiceError(
        `Failed to ${context}: Server returned ${axiosError.response.status}`,
        error
      );
    } else if (axiosError.request) {
      // Request made but no response received
      throw new StudentServiceError(
        `Failed to ${context}: No response from server. Please check your internet connection.`,
        error
      );
    }
  }
  
  // Generic error
  throw new StudentServiceError(
    `Failed to ${context}: An unexpected error occurred.`,
    error
  );
};

export const studentService = {
  /**
   * Fetch all students from JSONPlaceholder API
   * Transforms user data into student format
   */
  async getAll(): Promise<Student[]> {
    try {
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
    } catch (error) {
      handleApiError(error, 'fetch students');
    }
  },

  /**
   * Fetch a single student by ID
   */
  async getById(id: number): Promise<Student> {
    try {
      const response = await axios.get<User>(`${JSONPLACEHOLDER_API}/users/${id}`);
      
      return {
        id: response.data.id,
        name: response.data.name,
        course: response.data.company.name,
        year: Math.floor(Math.random() * 4) + 1,
      };
    } catch (error) {
      handleApiError(error, `fetch student with ID ${id}`);
    }
  },
};
