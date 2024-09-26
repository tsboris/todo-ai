import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { getTodos, createTodo, Todo, SubTask } from '../services/api';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
  };

  const handleCreateTodo = async () => {
    if (newTodoTitle.trim()) {
      await createTodo({ title: newTodoTitle, completed: false, subTasks: [] });
      setNewTodoTitle('');
      fetchTodos();
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="New todo title"
      />
      <button onClick={handleCreateTodo}>Add Todo</button>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={fetchTodos} />
      ))}
    </div>
  );
};

export default TodoList;