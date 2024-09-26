import express from 'express';
import { getTodos, createTodo, updateTodo } from '../controllers/todoController';

const router = express.Router();

router.get('/todos', getTodos);
router.post('/todos', createTodo);
router.put('/todos/:id', updateTodo);

export { router as todoRoutes };