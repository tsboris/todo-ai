import mongoose, { Schema, Document } from 'mongoose';

interface ISubTask {
  title: string;
  completed: boolean;
}

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  subTasks: ISubTask[];
}

const SubTaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  subTasks: [SubTaskSchema],
});

export default mongoose.model<ITodo>('Todo', TodoSchema);