import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Todo } from 'src/entity/todo.entity';
import {
  Connection,
  DeleteResult,
  getRepository,
  InsertResult,
  UpdateResult,
} from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly connection: Connection) {}

  getTodos(): Promise<Todo[]> {
    return getRepository(Todo).find();
  }

  getTodo(id: number): Promise<Todo> {
    return getRepository(Todo).findOne(id);
  }

  addTodo(todo: CreateTodoDto): Promise<InsertResult> {
    return getRepository(Todo).insert(todo);
  }

  async updateTodo(id: number, todo: UpdateTodoDto): Promise<UpdateResult> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await queryRunner.manager.update(Todo, id, todo);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  deleteTodo(id: number): Promise<DeleteResult> {
    return getRepository(Todo).delete(id);
  }
}
