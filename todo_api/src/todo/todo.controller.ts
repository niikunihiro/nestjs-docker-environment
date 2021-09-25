import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NowProvider } from 'src/date/now.provider';
import { Todo } from 'src/entity/todo.entity';
import { InsertResult, UpdateResult } from 'typeorm';
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
  async updateTodo(
    @Param('id') id: number,
    @Body() todo: UpdateTodoDto,
  ): Promise<UpdateResult> {
    todo.updated_at = this.now.getNowString();
    return this.todoService.updateTodo(id, todo);
  }
}
