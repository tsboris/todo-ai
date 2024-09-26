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

  const handleToggleSubTaskComplete = async (subTaskId: string) => {
    try {
      const updatedSubTasks = todo.subTasks.map(subTask => 
        subTask.id === subTaskId ? { ...subTask, completed: !subTask.completed } : subTask
      );
      const updatedTodo = { ...todo, subTasks: updatedSubTasks };
      await updateTodo(updatedTodo);
      onUpdate();
    } catch (error) {
      console.error('Failed to update subtask:', error);
    }
  };

  const handleDeleteSubTask = async (subTaskId: string) => {
    try {
      const updatedSubTasks = todo.subTasks.filter(subTask => subTask.id !== subTaskId);
      const updatedTodo = { ...todo, subTasks: updatedSubTasks };
      await updateTodo(updatedTodo);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete subtask:', error);
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
          <li key={subTask.id}>
            <input
              type="checkbox"
              checked={subTask.completed}
              onChange={() => handleToggleSubTaskComplete(subTask.id)}
            />
            <span style={{ textDecoration: subTask.completed ? 'line-through' : 'none' }}>
              {subTask.title}
            </span>
            <button onClick={() => handleDeleteSubTask(subTask.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoItem;