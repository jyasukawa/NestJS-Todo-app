import { Controller, Get, Param, Post } from '@nestjs/common';
import { CatService } from './cat.service';
import { Cat } from './cat.entity';

@Controller('cat')
export class CatController {
    constructor(private readonly catService: CatService) {}

    @Post('initialize')
    async initializeCats(): Promise<string> {
        await this.catService.initializeCats();
        return 'Cat data initialized';
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catService.findAll();
    }

    @Get('a')
    catSayHi(): string {
        return this.catService.catGreeting();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cat> {
        return this.catService.findOne(Number(id));
    }
}