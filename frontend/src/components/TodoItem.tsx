import React from 'react';
import { Todo, SubTask } from '../services/api';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate }) => {
  const handleToggleComplete = () => {
    // Implement toggle completion logic here
    // For now, we'll just call onUpdate
    onUpdate();
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      <span>{todo.title}</span>
      {/* Add more UI elements for subtasks if needed */}
    </div>
  );
};

export default TodoItem;