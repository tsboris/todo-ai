const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  subTasks: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE_URL}/todos`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  console.log('Sending PUT request to:', `${API_BASE_URL}/todos/${todo.id}`);
  console.log('Request body:', JSON.stringify(todo));
  const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    console.error('Update failed:', response.status, response.statusText);
    throw new Error('Failed to update todo');
  }
  const updatedTodo = await response.json();
  console.log('Response:', updatedTodo);
  return updatedTodo;
};