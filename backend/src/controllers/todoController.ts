import { Request, Response } from 'express';
import Todo from '../models/Todo';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, completed, subTasks } = req.body;
    const newTodo = new Todo({ title, completed, subTasks });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed, subTasks } = req.body;
    console.log('Updating todo:', id);
    console.log('Update data:', { title, completed, subTasks });
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed, subTasks },
      { new: true }
    );
    if (!updatedTodo) {
      console.log('Todo not found:', id);
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log('Updated todo:', updatedTodo);
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Error updating todo' });
  }
};

// Add more controller methods for deleting todos and managing subtasks