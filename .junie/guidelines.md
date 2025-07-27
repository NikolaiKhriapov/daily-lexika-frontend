# Developer Guidelines <!-- KEEP THIS FILE SHORT, ACTIONABLE & ALWAYS UP-TO-DATE -->

This document provides essential project information. It covers the project structure, tech stack, and guidelines for development and testing.

## Project Overview

The project is organized as a monorepo using Nx with multiple applications:

- **daily-lexika**: Main application module for language learning features
- **admin**: Administration module
- **landing-yekaterina**: Landing page application

The project also includes a shared library module with common code used by the applications:

- **library**: Contains shared code organized by application and a common "shared" directory

## Tech Stack

- **TypeScript**: Core programming language
- **React 18**: UI library
- **Next.js 14**: React framework for server-side rendering and static site generation
- **Redux Toolkit**: State management with RTK Query for API calls
- **Chakra UI**: Component library for consistent UI design
- **Formik & Yup**: Form handling and validation
- **i18next**: Internationalization
- **Axios**: HTTP client
- **Nx**: Monorepo build system
- **ESLint & Prettier**: Code quality and formatting
- **Docker**: Containerization

## Best Practices

1. **Code Organization**:
   - **Feature-Sliced Design (FSD)**: All projects in the monorepo must follow FSD principles
   - Organize code according to FSD layers (shared, entities, features, widgets, pages, app)
   - Follow FSD's separation of concerns and unidirectional dependencies between layers
   - Keep components, store, and utilities in their respective directories according to FSD structure
   - Use shared components from the UI directory for consistency
   - Keep modules independent; shared code should be in the library directory

2. **State Management**:
   - Use Redux Toolkit for global state management
   - Use RTK Query for API calls and caching
   - Organize API endpoints by domain in separate files
   - Use optimistic updates for mutations when appropriate

3. **Component Structure**:
   - Separate UI components from container components
   - Use Chakra UI components for consistent styling
   - Keep components focused on a single responsibility
   - Use TypeScript interfaces for props

4. **Error Handling**:
   - Handle API errors gracefully
   - Provide user-friendly error messages
   - Use proper error boundaries
   - Log errors with appropriate levels

5. **Internationalization**:
   - Use i18next for all user-facing text
   - Store messages in resource bundles
   - Support multiple languages
   - Format dates/numbers according to locale

6. **Security**:
   - Follow security best practices
   - Use proper authentication and authorization
   - Sanitize user inputs
   - Protect sensitive routes

7. **Documentation**:
   - Keep this guide updated as the project evolves
   - Document complex components and functions
   - Use TypeScript interfaces for better code documentation

8. **Testing** (for now - skipping tests):
   - Write unit tests for components and utilities
   - Test both success and error scenarios
   - Mock external dependencies appropriately
   - Maintain good test coverage

9. **Performance**:
   - Use React.memo for expensive components
   - Optimize re-renders
   - Use proper keys in lists
   - Implement code splitting for better loading times
   - Use Next.js features for performance optimization

10. **Accessibility**:
    - Follow WCAG guidelines
    - Use semantic HTML
    - Provide proper ARIA attributes
    - Ensure keyboard navigation works
    - Test with screen readers
