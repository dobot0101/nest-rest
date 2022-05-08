import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  hello(): string {
    return 'welcome to my first nest js api';
  }
}
