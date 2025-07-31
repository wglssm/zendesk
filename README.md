# Zendesk Contact Center

A React application that displays a list of contact center agents with pagination. This application fetches agent data from an API and displays it in a user-friendly interface using Tailwind CSS.

## Features

- Display agents with their status, profile, and avatar
- Pagination with customizable page size
- Responsive design using Tailwind CSS
- Error handling and loading states
- Unit testing with Vitest
- End-to-end testing with Playwright

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## Tech Stack

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static type checking for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Next-generation frontend build tool
- **Vitest**: Unit testing framework
- **Playwright**: End-to-end testing framework

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Install dependencies

   ```bash
   npm install
   ```

2. Run the development server

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code quality issues
- `npm test` - Run unit tests with Vitest
- `npm run test:watch` - Run unit tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test:e2e:ui` - Run end-to-end tests with Playwright UI mode

## Project Structure

```bash
src/
├── api/            # API services
├── components/     # React components
├── hooks/          # Custom React hooks
├── test/           # Test setup and utilities
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```
