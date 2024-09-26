import React from 'react';
import { Todo, updateTodo } from '../services/api';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate }) => {
  const handleToggleComplete = async () => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      console.log('Sending update request:', updatedTodo);
      const result = await updateTodo(updatedTodo);
      console.log('Update response:', result);
      onUpdate();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title} (ID: {todo._id})
      </span>
    </div>
  );
};

export default TodoItem;