import { Request, Response } from 'express';
import { getTodos, createTodo } from '../controllers/todoController';
import Todo from '../models/Todo';

jest.mock('../models/Todo');

describe('Todo Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
        return mockResponse;
      }),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getTodos', () => {
    it('should return todos', async () => {
      const mockTodos = [{ id: '1', title: 'Test Todo', completed: false, subTasks: [] }];
      (Todo.find as jest.Mock).mockResolvedValue(mockTodos);

      await getTodos(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockTodos);
    });

    it('should handle errors', async () => {
      (Todo.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await getTodos(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching todos' });
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const mockTodo = { id: '1', title: 'New Todo', completed: false, subTasks: [] };
      mockRequest.body = { title: 'New Todo', completed: false, subTasks: [] };
      (Todo.prototype.save as jest.Mock).mockResolvedValue(mockTodo);

      await createTodo(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTodo);
    });

    it('should handle errors', async () => {
      mockRequest.body = { title: 'New Todo', completed: false, subTasks: [] };
      (Todo.prototype.save as jest.Mock).mockRejectedValue(new Error('Database error'));

      await createTodo(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error creating todo' });
    });
  });
});