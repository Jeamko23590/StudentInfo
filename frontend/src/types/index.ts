// Common types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Student types
export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  year: number;
  phone?: string;
  website?: string;
}

// API User type (from JSONPlaceholder)
export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Loading and error states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
