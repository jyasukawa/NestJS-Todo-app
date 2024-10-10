import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
    constructor(
        @InjectRepository(Cat)
        private readonly catRepository: Repository<Cat>,
    ) {}

        // 初期データをデータベースに挿入
    async initializeCats() {
            const cats = [
            { name: 'Cat 1', age: 2, breed: 'Persian' },
            { name: 'Cat 2', age: 3, breed: 'Siamese' },
            { name: 'Cat 3', age: 1, breed: 'Maine Coon' },
        ];

        await this.catRepository.save(cats);
    }

        // 全ての猫を取得
    findAll(): Promise<Cat[]> {
        return this.catRepository.find();
    }

        // 指定IDの猫を取得
    findOne(id: number): Promise<Cat> {
        return this.catRepository.findOneBy({ id });
    }
    catGreeting(): string {
        return 'cat says hi';
    }
}
