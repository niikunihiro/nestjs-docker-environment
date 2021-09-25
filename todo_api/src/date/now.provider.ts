import { Injectable } from '@nestjs/common';

@Injectable()
export class NowProvider {
  private readonly date: Date;
  constructor() {
    // new しない方法があるはず。
    this.date = new Date();
  }

  getNowString() {
    return this.date.toISOString();
  }
}
