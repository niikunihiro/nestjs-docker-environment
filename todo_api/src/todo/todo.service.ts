import { Injectable } from '@nestjs/common';
import { Todo } from 'src/entity/todo.entity';
import { getRepository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  getTodos() {
    return getRepository(Todo).find();
  }

  addTodo(todo: CreateTodoDto) {
    return getRepository(Todo).insert(todo);
  }
}
