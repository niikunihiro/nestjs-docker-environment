import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { resourceUsage } from 'process';
import { NowProvider } from 'src/date/now.provider';
import { Todo } from 'src/entity/todo.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { resourceLimits } from 'worker_threads';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly now: NowProvider,
  ) {}

  @Get()
  getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }

  @Get(':id')
  async getTodo(@Param('id') id: number): Promise<Todo> {
    return this.todoService.getTodo(id);
  }

  @Post()
  async addTodo(@Body() todo: CreateTodoDto): Promise<InsertResult> {
    const now = this.now.getNowString();
    todo.created_at = now;
    todo.updated_at = now;
    return this.todoService.addTodo(todo);
  }

  @Put(':id')
  @HttpCode(204)
  async updateTodo(
    @Param('id') id: number,
    @Body() todo: UpdateTodoDto,
  ): Promise<void> {
    todo.updated_at = this.now.getNowString();
    const updateResult = await this.todoService.updateTodo(id, todo);
    if (updateResult.affected === 0) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number): Promise<DeleteResult> {
    return this.todoService.deleteTodo(id);
  }
}
