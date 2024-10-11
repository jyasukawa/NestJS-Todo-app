import { Controller, Get, Param, Post, Delete, ParseIntPipe } from '@nestjs/common';
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

    @Get('greeting')
    catSayHi(): string {
        return this.catService.catGreeting();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cat> {
        return this.catService.findOne(Number(id));
    }

    @Delete(':id')
    async deleteCat(@Param('id', ParseIntPipe) id: number): Promise<string> {
        await this.catService.deleteCat(id);
        return `Cat with ID ${id} has been deleted`;
    }
}
//ParseIntPipeを使用しない->uriに文字列が入った場合にサーバー側が処理できず500エラーになる
//ParseIntPipeを使用すると"Bad Request","statusCode":400となる