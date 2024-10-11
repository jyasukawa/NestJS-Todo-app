import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatService } from './cat.service';
import { Cat } from './entity/cat.entity';

describe('CatService', () => {
  let service: CatService;
  let catRepository: Repository<Cat>;

  // モックのCatリポジトリ
  const mockCatRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: getRepositoryToken(Cat),
          useValue: mockCatRepository,
        },
      ],
    }).compile();

    service = module.get<CatService>(CatService);
    catRepository = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and save cats', async () => {
    // モックの動作を定義
    mockCatRepository.save.mockResolvedValueOnce([
      { id: 1, name: 'Cat 1', age: 2, breed: 'Persian' },
      { id: 2, name: 'Cat 2', age: 3, breed: 'Siamese' },
      { id: 3, name: 'Cat 3', age: 1, breed: 'Maine Coon' },
    ]);

    await service.initializeCats();

    // `save` が正しく呼び出されているか確認
    expect(mockCatRepository.save).toHaveBeenCalledWith([
      { name: 'Cat 1', age: 2, breed: 'Persian' },
      { name: 'Cat 2', age: 3, breed: 'Siamese' },
      { name: 'Cat 3', age: 1, breed: 'Maine Coon' },
    ]);
  });

  it('should return all cats', async () => {
    const cats = [
      { id: 1, name: 'Cat 1', age: 2, breed: 'Persian' },
      { id: 2, name: 'Cat 2', age: 3, breed: 'Siamese' },
    ];

    mockCatRepository.find.mockResolvedValueOnce(cats);

    const result = await service.findAll();
    expect(result).toEqual(cats);
    expect(mockCatRepository.find).toHaveBeenCalledTimes(1);
  });
});