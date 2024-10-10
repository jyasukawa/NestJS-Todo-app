import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  private readonly cats = [];

  catGreeting(): string {
    return 'cat says hi';
  }
}
