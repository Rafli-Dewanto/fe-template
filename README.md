# Next.js Frontend Template

A modern, feature-rich Next.js template with built-in best practices and utilities for rapid development.

## Features

- 🚀 Built with Next.js 15
- 💅 Styled with Tailwind CSS and Radix UI
- 🎯 Type-safe with TypeScript
- 📝 Form handling with React Hook Form and Zod validation
- 🔒 Input sanitization and security utilities
- 🛠 Custom hooks and utilities
- 🌐 API integration setup with Axios
- 🔄 State management with React Query
- 🌙 Dark mode support
- 🧪 Testing setup with Jest

## Prerequisites

- Node.js 18.18.0 or later
- npm 9.x or later

## Getting Started

1. Clone the repository:

```bash
git clone <your-repo-url>
cd fe-template
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration.

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/           # App router pages and layouts
├── components/    # Reusable UI components
├── contexts/      # React contexts
├── hooks/         # Custom React hooks
├── lib/          # Third-party library configurations
├── services/     # API services and data fetching
├── styles/       # Global styles and Tailwind config
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run format` - Format code with Prettier

## Utilities and Hooks

### Form Handling

- `useForm` - Type-safe form handling with React Hook Form and Zod
- Form validation utilities in `utils/validation.ts`

### Error Handling

- Standardized error handling in `utils/error-handling.ts`
- Toast notifications for errors

### Security

- Input sanitization utilities in `utils/sanitization.ts`
- XSS prevention
- CSRF protection setup

### API Integration

- Axios instance setup with interceptors
- React Query hooks for data fetching
- API service structure in `services/`

## Best Practices

1. **Type Safety**
   - Use TypeScript for all files
   - Define interfaces and types in `types/` directory
   - Use Zod for runtime type validation

2. **Code Organization**
   - Follow feature-based folder structure
   - Keep components small and focused
   - Use custom hooks for logic reuse

3. **Performance**
   - Use React Query for caching
   - Implement proper loading states
   - Use Next.js Image component for images

4. **Security**
   - Sanitize all user inputs
   - Use environment variables for secrets
   - Implement proper error boundaries

## Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## License

MIT
