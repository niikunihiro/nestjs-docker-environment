import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from '../entity/todo.entity';
import { Connection } from 'typeorm';
import { NowProvider } from '../date/now.provider';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let connection;
  const mockConnection = () => ({
    transaction: jest.fn(),
  });

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        NowProvider,
        {
          provide: getRepositoryToken(Todo),
          useValue: {
            find: () => {},
          },
        },
        {
          provide: Connection,
          useFactory: mockConnection,
        },
      ],
    }).compile();

    service = await moduleRef.get<TodoService>(TodoService);
    connection = await moduleRef.get<Connection>(Connection);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
