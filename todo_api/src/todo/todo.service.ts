import { Injectable } from '@nestjs/common';
import { Todo } from 'src/entity/todo.entity';
import { getRepository, InsertResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

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
}
