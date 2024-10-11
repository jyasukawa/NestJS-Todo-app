import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatService {
    constructor(
        @InjectRepository(Cat)
        private readonly catRepository: Repository<Cat>,
    ) {}

        // 初期データをデータベースに挿入
    async initializeCats() {
            const cats = [
            { name: 'Cat 1', age: 2 },
            { name: 'Cat 2', age: 3 },
            { name: 'Cat 3', age: 1 },
        ];

        await this.catRepository.save(cats);
    }

        // 全ての猫を取得
    findAll(): Promise<Cat[]> {
        return this.catRepository.find();
    }

        // 指定IDの猫を取得
    async findOne(id: number): Promise<Cat> {
        const cat = await this.catRepository.findOneBy({ id });
        if (!cat) {
            throw new NotFoundException(`Cat with ID ${id} not found`);
        }
        return cat;
    }

    catGreeting(): string {
        return 'cat says hi';
    }

    async createCat(cat: CreateCatDto): Promise<Cat> {
        const newCat = this.catRepository.create(cat); // 新しい猫のエンティティを作成
        return this.catRepository.save(newCat); // データベースに保存
    }

    async deleteCat(id: number): Promise<void> {
        const result = await this.catRepository.findOneBy({ id });
        if (!result) {
            throw new NotFoundException(`Cat with ID ${id} not found`);
        }
        await this.catRepository.delete(id);
    }
}
