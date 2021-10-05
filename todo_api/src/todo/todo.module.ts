import { Module } from '@nestjs/common';
import { NowProvider } from '../date/now.provider';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [TodoModule],
  controllers: [TodoController],
  providers: [TodoService, NowProvider],
})
export class TodoModule {}
