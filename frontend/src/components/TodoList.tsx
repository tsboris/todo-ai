import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { getTodos, createTodo, Todo } from '../services/api';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await getTodos();
      console.log('Fetched todos:', fetchedTodos);
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const handleCreateTodo = async () => {
    if (newTodoTitle.trim()) {
      try {
        await createTodo({ title: newTodoTitle, completed: false, subTasks: [] });
        setNewTodoTitle('');
        await fetchTodos();
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
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