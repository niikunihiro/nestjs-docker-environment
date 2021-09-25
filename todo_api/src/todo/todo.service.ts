import { Injectable } from '@nestjs/common';
import { Todo } from 'src/entity/todo.entity';
import {
  DeleteResult,
  getRepository,
  InsertResult,
  UpdateResult,
} from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  getTodos(): Promise<Todo[]> {
    return getRepository(Todo).find();
  }

  getTodo(id: number): Promise<Todo> {
    return getRepository(Todo).findOne(id);
  }

  addTodo(todo: CreateTodoDto): Promise<InsertResult> {
    return getRepository(Todo).insert(todo);
  }

  updateTodo(id: number, todo: UpdateTodoDto): Promise<UpdateResult> {
    return getRepository(Todo).update(id, todo);
  }

  deleteTodo(id: number): Promise<DeleteResult> {
    return getRepository(Todo).delete(id);
  }
}
