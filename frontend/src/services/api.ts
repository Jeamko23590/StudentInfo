import { config } from '@/config';

const BASE_URL = config.apiBaseUrl;

export class ApiError extends Error {
  public status?: number;
  public statusText?: string;
  
  constructor(
    message: string,
    status?: number,
    statusText?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorMessage = `API request failed: ${response.statusText || 'Unknown error'}`;
      throw new ApiError(errorMessage, response.status, response.statusText);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network errors or other fetch failures
    if (error instanceof TypeError) {
      throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    throw new ApiError('An unexpected error occurred while making the request.');
  }
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
};
