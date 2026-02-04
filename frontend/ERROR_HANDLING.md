# Error Handling Documentation

This document describes the comprehensive error handling implementation in the Student Information System.

## Overview

The application implements a multi-layered error handling strategy to provide users with clear, actionable feedback when API calls fail.

## Error Handling Layers

### 1. API Layer (`services/api.ts`)

**Custom Error Class:**
```typescript
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

**Error Types Handled:**
- HTTP errors (4xx, 5xx status codes)
- Network errors (connection failures)
- Unexpected errors

**Features:**
- Captures HTTP status codes and status text
- Provides user-friendly error messages
- Distinguishes between network and server errors

### 2. Service Layer (`services/studentService.ts`)

**Custom Error Class:**
```typescript
export class StudentServiceError extends Error {
  constructor(
    message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'StudentServiceError';
  }
}
```

**Error Handling:**
- Catches Axios-specific errors
- Differentiates between server responses and network failures
- Provides context-specific error messages
- Preserves original error for debugging

### 3. Component Layer

#### Full-Page Error Component (`components/ErrorMessage.tsx`)

Used for critical errors that prevent page rendering:

**Features:**
- Prominent error display with icon
- Customizable title and message
- Retry functionality
- Navigation to home page
- Responsive design

**Usage:**
```typescript
<ErrorMessage 
  message={error}
  onRetry={fetchStudents}
  onGoHome={() => window.location.href = '/'}
/>
```

#### Inline Error Component (`components/InlineError.tsx`)

Used for non-critical errors within components:

**Features:**
- Compact error display
- Dismissible
- Suitable for form validation or partial failures

**Usage:**
```typescript
<InlineError 
  message="Failed to update student information"
  onDismiss={() => setError(null)}
/>
```

## Implementation Example

### Students Page (`pages/Students/index.tsx`)

```typescript
const [error, setError] = useState<string | null>(null);

const fetchStudents = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const data = await studentService.getAll();
    setStudents(data);
  } catch (err) {
    // Extract meaningful error message
    const errorMessage = err instanceof Error 
      ? err.message 
      : 'Failed to fetch student data. Please try again later.';
    
    setError(errorMessage);
    console.error('Error fetching students:', err);
  } finally {
    setLoading(false);
  }
};

// In render:
if (error) {
  return (
    <ErrorMessage 
      message={error}
      onRetry={fetchStudents}
      onGoHome={() => window.location.href = '/'}
    />
  );
}
```

## Error Messages

### Network Errors
- "Network error: Unable to connect to the server. Please check your internet connection."

### Server Errors
- "API request failed: [Status Text]"
- "Failed to fetch students: Server returned [Status Code]"

### Generic Errors
- "An unexpected error occurred while making the request."
- "Failed to fetch student data. Please try again later."

## Best Practices

1. **Always use try-catch blocks** around async API calls
2. **Set error state to null** before making new requests
3. **Extract meaningful error messages** from error objects
4. **Log errors to console** for debugging
5. **Provide retry functionality** when appropriate
6. **Use loading states** to prevent duplicate requests
7. **Clean up in finally blocks** (e.g., setLoading(false))

## Testing Error Handling

To test error handling:

1. **Network Errors:** Disconnect from internet and try loading students
2. **Server Errors:** Modify API URL to invalid endpoint
3. **Timeout Errors:** Use network throttling in browser DevTools

## Future Enhancements

- Toast notifications for non-critical errors
- Error boundary for catching React component errors
- Retry with exponential backoff
- Error reporting/logging service integration
- Offline mode with cached data
