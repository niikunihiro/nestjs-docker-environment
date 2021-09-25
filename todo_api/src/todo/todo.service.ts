import { Injectable } from '@nestjs/common';
import { Todo } from 'src/entity/todo.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class TodoService {
  getTodos() {
    return getRepository(Todo).find();
  }
}
