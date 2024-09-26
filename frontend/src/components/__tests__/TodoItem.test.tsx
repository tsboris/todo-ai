import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../TodoItem';
import { updateTodo } from '../../services/api';

jest.mock('../../services/api');

describe('TodoItem', () => {
  const mockTodo = {
    _id: '1',
    title: 'Test Todo',
    completed: false,
    subTasks: [
      { id: 'sub1', title: 'Subtask 1', completed: false },
    ],
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    (updateTodo as jest.Mock).mockResolvedValue(mockTodo);
  });

  it('renders the todo item', () => {
    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} />);
    expect(screen.getByTestId('todo-title')).toHaveTextContent('Test Todo');
    expect(screen.getByText('Subtask 1')).toBeInTheDocument();
  });

  it('toggles todo completion', async () => {
    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} />);
    const checkbox = screen.getByRole('checkbox', { name: /Test Todo/i });

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(updateTodo).toHaveBeenCalledWith({ ...mockTodo, completed: true });
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });

  it('adds a new subtask', async () => {
    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} />);
    const input = screen.getByPlaceholderText('New subtask');
    const addButton = screen.getByText('Add Subtask');

    fireEvent.change(input, { target: { value: 'New Subtask' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(updateTodo).toHaveBeenCalledWith(expect.objectContaining({
        subTasks: expect.arrayContaining([
          expect.objectContaining({ title: 'New Subtask', completed: false }),
        ]),
      }));
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });
});