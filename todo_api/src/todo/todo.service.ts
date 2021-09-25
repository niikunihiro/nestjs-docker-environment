import { Injectable } from '@nestjs/common';
import { Todo } from 'src/entity/todo.entity';
import { getRepository, InsertResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  getTodos(): Promise<Todo[]> {
    return getRepository(Todo).find();
  }

  addTodo(todo: CreateTodoDto) {
  addTodo(todo: CreateTodoDto): Promise<InsertResult> {
    return getRepository(Todo).insert(todo);
  }
}
