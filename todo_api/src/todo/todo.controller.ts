import { Body, Controller, Get, Post } from '@nestjs/common';
import { NowProvider } from 'src/date/now.provider';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly now: NowProvider,
  ) {}

  @Get()
  getTodos(): any {
    return this.todoService.getTodos();
  }

  @Post()
  async addTodo(@Body() todo: CreateTodoDto) {
    const now = this.now.getNowString();
    todo.created_at = now;
    todo.updated_at = now;
    return this.todoService.addTodo(todo);
  }
}
