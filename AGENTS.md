# AGENTS.md

This file provides instructions for AI agents working with this codebase.

## Project Overview

This is a Vue.js 3 application that functions as a matrix calculator. The core logic is handled by the `mathjs` library. The application is a single-page application (SPA) and does not have a backend.

## Tech Stack

-   **Vue.js 3:** The frontend framework.
-   **Composition API:** Used for component logic.
-   **Tailwind CSS:** For styling.
-   **`mathjs`:** For matrix calculations.

## Folder Structure

-   `src/`: Contains the application source code.
-   `src/assets/`: Static assets like CSS and images.
-   `src/components/`: Vue components.
-   `src/composables/`: Reusable logic, such as matrix operations.
-   `public/`: Public assets.

## Development

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run serve
    ```

## Linting

To check for code quality and style issues, run the linter:

```bash
npm run lint
```

## Key Files

-   `src/App.vue`: The main application component.
-   `src/components/MatrixInput.vue`: The primary UI component for matrix input and displaying results.
-   `src/components/OperationButtons.vue`: The component that contains the buttons for performing matrix operations.
-   `src/composables/useMatrixOperations.js`: The core logic for all matrix calculations resides in this file.

## Coding Conventions

-   Follow standard Vue.js and JavaScript best practices.
-   Use the Composition API for all new components.
-   Separate business logic from UI components by using composables.
-   Ensure that all new features have proper error handling.
-   Keep the UI clean and user-friendly.
