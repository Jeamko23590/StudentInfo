# Frontend

React + TypeScript + Vite + Tailwind CSS

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview  # preview production build
```

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── layout/
│   └── ui/
├── config/
├── context/
├── hooks/
├── pages/
├── services/
├── types/
├── utils/
├── App.tsx
├── index.css
└── main.tsx
```

## Path Aliases

Use `@/` to import from `src/`:

```tsx
import { Button } from '@/components';
import { useLoading } from '@/context';
import { api } from '@/services';
```

---

## Folder Guide

### `assets/`
Static files like images, fonts, and icons.

**Do:**
- Store images, SVGs, fonts here
- Use descriptive file names: `logo-dark.svg`, `hero-background.png`

**Don't:**
- Put component files here
- Store large video files (use CDN instead)

---

### `components/`
Reusable UI elements split into `layout/` and `ui/`.

#### `components/ui/`
Small, reusable components (Button, Input, Card, Modal, etc.)

**Do:**
- Keep components generic and reusable
- Accept props for customization
- Export from `index.ts`

```tsx
// components/ui/Badge.tsx
export function Badge({ children, variant = 'default' }) { ... }

// components/ui/index.ts
export * from './Badge';
```

**Don't:**
- Add business logic here
- Fetch data inside UI components
- Make components page-specific

#### `components/layout/`
Structural components (Navbar, Sidebar, Footer, PageWrapper)

**Do:**
- Handle app-wide layout structure
- Keep navigation logic here

**Don't:**
- Put page content here
- Mix with UI components

---

### `config/`
App configuration and constants.

**Do:**
- Store API URLs, feature flags, app settings
- Use environment variables for sensitive data

```tsx
// config/index.ts
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_URL,
  appName: 'My App',
  itemsPerPage: 10,
};
```

**Don't:**
- Store secrets or API keys directly (use `.env`)
- Put component logic here

---

### `context/`
React Context providers for global state.

**Do:**
- Create context for truly global state (auth, theme, loading)
- Provide custom hooks for consuming context

```tsx
// Using context
import { useLoading } from '@/context';
const { setLoading } = useLoading();
```

**Don't:**
- Use context for local component state
- Create too many contexts (causes re-renders)
- Put API calls directly in context

---

### `hooks/`
Custom React hooks.

**Do:**
- Prefix with `use`: `useLocalStorage`, `useDebounce`
- Keep hooks focused on one responsibility
- Export from `index.ts`

```tsx
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T { ... }

// hooks/index.ts
export * from './useDebounce';
```

**Don't:**
- Put non-hook functions here (use `utils/`)
- Create hooks that do too many things

---

### `pages/`
Page-level components, one folder per page.

**Do:**
- Create folder for each page: `pages/Dashboard/index.tsx`
- Keep page-specific components inside the page folder
- Export from `pages/index.ts`

```
pages/
├── Dashboard/
│   ├── index.tsx           # Main page component
│   ├── DashboardStats.tsx  # Page-specific component
│   └── useDashboard.ts     # Page-specific hook (optional)
├── Login/
│   └── index.tsx
└── index.ts
```

**Don't:**
- Put reusable components here (use `components/`)
- Create deeply nested page structures

---

### `services/`
API calls and external service integrations.

**Do:**
- Group by feature: `userService.ts`, `authService.ts`
- Use the base `api` helper for consistency
- Handle errors appropriately

```tsx
// services/userService.ts
import { api } from './api';

export const userService = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (data: CreateUserDto) => api.post('/users', data),
};
```

**Don't:**
- Call `fetch` directly in components
- Mix UI logic with API calls
- Store state in services

---

### `types/`
TypeScript type definitions and interfaces.

**Do:**
- Define shared types here
- Use descriptive names: `User`, `ApiResponse<T>`
- Group related types in files: `user.types.ts`, `api.types.ts`

```tsx
// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// types/index.ts
export * from './user';
```

**Don't:**
- Define component prop types here (keep with component)
- Duplicate types that exist in libraries

---

### `utils/`
Pure utility functions.

**Do:**
- Keep functions pure (no side effects)
- Write small, focused functions
- Export from `index.ts`

```tsx
// utils/format.ts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount);
}
```

**Don't:**
- Put React hooks here (use `hooks/`)
- Add functions with side effects
- Import React in utility files

---

## Global Loading

```tsx
import { useLoading } from '@/context';

function MyComponent() {
  const { setLoading } = useLoading();
  
  const fetchData = async () => {
    setLoading(true);
    try {
      await api.get('/data');
    } finally {
      setLoading(false);
    }
  };
}
```

---

## Environment Variables

1. Copy `.env.example` to `.env`
2. Configure your variables:

```bash
VITE_API_URL=http://localhost:3000/api
```

3. Access in code:

```tsx
import.meta.env.VITE_API_URL
```

**Note:** Only variables prefixed with `VITE_` are exposed to the client.

---

## Using `index.ts` (Barrel Exports)

Every folder has an `index.ts` file that re-exports everything from that folder. This is called a "barrel export" pattern.

### Why It's Important

1. **Cleaner imports** - Import multiple items from one path instead of many
2. **Encapsulation** - Hide internal folder structure from consumers
3. **Easier refactoring** - Move files around without breaking imports everywhere
4. **Single source of truth** - Control what's publicly available from each folder
5. **Better IDE autocomplete** - Typing `@/components` shows all available exports
6. **Reduced cognitive load** - Don't need to remember exact file paths

### Why It's a Best Practice

| Without `index.ts` | With `index.ts` |
|-------------------|-----------------|
| Must know exact file paths | Import from folder directly |
| Renaming files breaks imports | Renaming only updates `index.ts` |
| Long import statements | Short, clean imports |
| Exposes internal structure | Hides implementation details |
| Hard to find available exports | All exports in one place |

**Real-world example:**

```tsx
// ❌ Without barrel exports - 6 lines, must know every path
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navbar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatCurrency } from '@/utils/format';

// ✅ With barrel exports - 3 lines, clean and simple
import { Button, Input, Card, Navbar } from '@/components';
import { useLocalStorage } from '@/hooks';
import { formatCurrency } from '@/utils';
```

**Refactoring benefit:**

```tsx
// If you rename Button.tsx to PrimaryButton.tsx:

// ❌ Without index.ts - must update EVERY file that imports Button
// (could be 50+ files across your project)

// ✅ With index.ts - only update one line in index.ts
// components/ui/index.ts
export * from './PrimaryButton';  // Changed from './Button'
// All other files still import from '@/components' - no changes needed!
```

### Why Use It?

```tsx
// ❌ Without barrel exports (messy)
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

// ✅ With barrel exports (clean)
import { Button, Input, Card } from '@/components';
```

### How It Works

```
components/
├── ui/
│   ├── Button.tsx      # export function Button() { ... }
│   ├── Input.tsx       # export function Input() { ... }
│   ├── Card.tsx        # export function Card() { ... }
│   └── index.ts        # export * from './Button'; export * from './Input'; ...
├── layout/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   └── index.ts        # export * from './Navbar'; export * from './Sidebar';
└── index.ts            # export * from './ui'; export * from './layout';
```

### Step-by-Step: Adding a New Component

1. Create your component file:

```tsx
// components/ui/Modal.tsx
export function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6">
        <button onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}
```

2. Add export to the folder's `index.ts`:

```tsx
// components/ui/index.ts
export * from './Button';
export * from './Input';
export * from './Card';
export * from './Modal';  // ← Add this line
```

3. Now use it anywhere:

```tsx
import { Modal } from '@/components';
```

### Step-by-Step: Adding a New Hook

1. Create the hook:

```tsx
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  // ... implementation
}
```

2. Export from `index.ts`:

```tsx
// hooks/index.ts
export * from './useLocalStorage';
export * from './useDebounce';  // ← Add this line
```

3. Use it:

```tsx
import { useDebounce } from '@/hooks';
```

### Step-by-Step: Adding a New Page

1. Create page folder with `index.tsx`:

```tsx
// pages/Settings/index.tsx
export function Settings() {
  return <div>Settings Page</div>;
}
```

2. Export from pages `index.ts`:

```tsx
// pages/index.ts
export * from './Dashboard';
export * from './Login';
export * from './Settings';  // ← Add this line
```

3. Use it:

```tsx
import { Settings } from '@/pages';
```

### Step-by-Step: Adding a New Service

1. Create the service:

```tsx
// services/authService.ts
import { api } from './api';

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};
```

2. Export from `index.ts`:

```tsx
// services/index.ts
export * from './api';
export * from './authService';  // ← Add this line
```

3. Use it:

```tsx
import { authService } from '@/services';
```

### Common Mistakes

```tsx
// ❌ DON'T: Forget to add export to index.ts
// (Component won't be importable from @/components)

// ❌ DON'T: Use default exports
export default function Button() { }  // Hard to re-export

// ✅ DO: Use named exports
export function Button() { }  // Easy to re-export with export * from

// ❌ DON'T: Import from deep paths
import { Button } from '@/components/ui/Button';

// ✅ DO: Import from barrel
import { Button } from '@/components';

// ❌ DON'T: Circular imports in index.ts
// If A imports from B and B imports from A, you'll get errors

// ✅ DO: Keep dependencies one-directional
```

### Quick Reference

| When you add...        | Update this `index.ts`           |
|------------------------|----------------------------------|
| UI component           | `components/ui/index.ts`         |
| Layout component       | `components/layout/index.ts`     |
| Page                   | `pages/index.ts`                 |
| Hook                   | `hooks/index.ts`                 |
| Service                | `services/index.ts`              |
| Utility function       | `utils/index.ts`                 |
| Type definition        | `types/index.ts`                 |
| Context                | `context/index.ts`               |

---

## General Best Practices

**Do:**
- Always add new exports to the folder's `index.ts`
- Use named exports (not default exports)
- Keep components small and focused
- Use TypeScript strictly
- Follow the folder structure consistently

**Don't:**
- Import from deep paths: ❌ `@/components/ui/Button`
- Use default exports: ❌ `export default function Button`
- Forget to update `index.ts` when adding files
- Create circular dependencies between folders
- Commit `.env` files (use `.env.example` as template)
