import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  Connection,
  DeleteResult,
  getRepository,
  QueryRunner,
  UpdateResult,
} from 'typeorm';
import { Todo } from '../entity/todo.entity';
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

  async addTodo(todo: CreateTodoDto): Promise<Todo> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let insertedTodo = new Todo();
    try {
      const newTodo = queryRunner.manager.create(Todo, todo);
      insertedTodo = await queryRunner.manager.save(newTodo);
      await queryRunner.commitTransaction();
      return insertedTodo;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
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

  async deleteTodo(id: number): Promise<DeleteResult> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await queryRunner.manager.delete(Todo, id);
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
}
