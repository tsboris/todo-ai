import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from '../TodoList';
import { getTodos, createTodo } from '../../services/api';

jest.mock('../../services/api');

describe('TodoList', () => {
  beforeEach(() => {
    (getTodos as jest.Mock).mockResolvedValue([]);
  });

  it('renders the todo list', async () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('New todo title')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  it('creates a new todo', async () => {
    (createTodo as jest.Mock).mockResolvedValue({ id: '1', title: 'New Todo', completed: false, subTasks: [] });
    render(<TodoList />);

    const input = screen.getByPlaceholderText('New todo title');
    const addButton = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(createTodo).toHaveBeenCalledWith({ title: 'New Todo', completed: false, subTasks: [] });
      expect(getTodos).toHaveBeenCalled();
    });
  });
});