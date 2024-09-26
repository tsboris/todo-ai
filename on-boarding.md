# Todo App with Subtasks

This project is a full-stack Todo application with support for subtasks, built using React, TypeScript, Node.js, Express, and MongoDB.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (v14 or later)
- npm (usually comes with Node.js)
- Docker and Docker Compose

## Project Structure

The project is divided into two main parts:
- `frontend/`: React application
- `backend/`: Express server

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd todo-app
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:5050/api
   MONGODB_URI=mongodb://mongo:27017/todoapp
   ```

3. Start the application using Docker Compose:
   ```
   docker-compose up --build
   ```

   This command will build and start the frontend, backend, and MongoDB containers.

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5050/api

## Development

### Frontend (React + TypeScript)

The frontend code is located in the `frontend/` directory.

- Main component: `src/components/TodoList.tsx`
- API service: `src/services/api.ts`

To run the frontend separately:
```
cd frontend
npm install
npm start
```

### Backend (Node.js + Express + TypeScript)

The backend code is located in the `backend/` directory.

- Main server file: `src/server.ts`
- API routes: `src/routes/todoRoutes.ts`
- Controllers: `src/controllers/todoController.ts`
- Database model: `src/models/Todo.ts`

To run the backend separately:
```
cd backend
npm install
npm run dev
```

## Testing

### Frontend Tests

Run frontend tests:
```
cd frontend
npm test
```

### Backend Tests

Run backend tests:
```
cd backend
npm test
```

## Deployment

The application is containerized using Docker, making it easy to deploy to various platforms. The `docker-compose.yml` file in the root directory defines the services and their configurations.

## Architecture Diagram

To better understand the application's structure, create an architecture diagram that illustrates the following components and their interactions:

1. Frontend (React)
2. Backend (Express)
3. Database (MongoDB)
4. API communication between Frontend and Backend
5. Docker containers for each service

You can use tools like draw.io, Lucidchart, or any other diagramming tool to create this visualization. Save the diagram as an image (e.g., `architecture_diagram.png`) and add it to the project root directory.

Once you've created the diagram, add the following section to this README:

```markdown
## Architecture

![Architecture Diagram](./architecture_diagram.svg)

This diagram illustrates the high-level architecture of the Todo App, showing how the frontend, backend, and database interact within the Docker environment.
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Create a pull request

## Troubleshooting

If you encounter any issues, please check the following:
- Ensure all required ports (3000, 5050, 27017) are available
- Check if Docker and Docker Compose are installed and running correctly
- Verify that the `.env` file is present and contains the correct values

If problems persist, please open an issue in the repository.

## Onboarding for New Developers

1. Read through this README to understand the project structure and setup.
2. Review the `docker-compose.yml` file to understand how the services are configured.
3. Explore the `frontend/` directory:
   - Examine `src/components/TodoList.tsx` and `src/components/TodoItem.tsx` to understand the main UI components.
   - Look at `src/services/api.ts` to see how API calls are made to the backend.
4. Explore the `backend/` directory:
   - Start with `src/server.ts` to see how the Express app is set up.
   - Review `src/routes/todoRoutes.ts` to understand the API endpoints.
   - Examine `src/controllers/todoController.ts` to see how the API logic is implemented.
   - Look at `src/models/Todo.ts` to understand the data model.
5. Run the application using Docker Compose and test its functionality.
6. Review the test files in both frontend and backend to understand the testing approach.
7. If you make changes, ensure all tests pass before submitting a pull request.

Welcome to the team, and happy coding!

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or support, please contact [project maintainer's email].
