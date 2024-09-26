import express from 'express';
import { getTodos, createTodo } from '../controllers/todoController';

const router = express.Router();

router.get('/todos', getTodos);
router.post('/todos', createTodo);

export { router as todoRoutes };