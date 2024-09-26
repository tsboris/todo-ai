import React, { useState } from 'react';
import { Todo, updateTodo, SubTask } from '../services/api';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate }) => {
  const [newSubTaskTitle, setNewSubTaskTitle] = useState('');

  const handleToggleComplete = async () => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await updateTodo(updatedTodo);
      onUpdate();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleAddSubTask = async () => {
    if (newSubTaskTitle.trim()) {
      const newSubTask: SubTask = {
        id: Date.now().toString(), // Temporary ID, will be replaced by the server
        title: newSubTaskTitle,
        completed: false
      };
      try {
        const updatedTodo = { ...todo, subTasks: [...todo.subTasks, newSubTask] };
        await updateTodo(updatedTodo);
        setNewSubTaskTitle('');
        onUpdate();
      } catch (error) {
        console.error('Failed to add subtask:', error);
      }
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
      <div>
        <input
          type="text"
          value={newSubTaskTitle}
          onChange={(e) => setNewSubTaskTitle(e.target.value)}
          placeholder="New subtask"
        />
        <button onClick={handleAddSubTask}>Add Subtask</button>
      </div>
      <ul>
        {todo.subTasks.map((subTask) => (
          <li key={subTask.id}>{subTask.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoItem;