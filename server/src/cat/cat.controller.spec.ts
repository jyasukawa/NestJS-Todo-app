import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { Cat } from './entity/cat.entity';

describe('CatController', () => {
  let controller: CatController;
  let service: CatService;

  // CatServiceのモック
  const mockCatService = {
    initializeCats: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    deleteCat: jest.fn(),
    catGreeting: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        {
          provide: CatService,
          useValue: mockCatService,
        },
      ],
    }).compile();

    controller = module.get<CatController>(CatController);
    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should initialize cats', async () => {
    // モックの動作を定義
    mockCatService.initializeCats.mockResolvedValueOnce(undefined);

    const result = await controller.initializeCats();

    expect(result).toBe('Cat data initialized');
    expect(mockCatService.initializeCats).toHaveBeenCalledTimes(1);
  });

  it('should return all cats', async () => {
    const cats: Cat[] = [
      { id: 1, name: 'Cat 1', age: 2 },
      { id: 2, name: 'Cat 2', age: 3 },
    ];

    mockCatService.findAll.mockResolvedValueOnce(cats);

    const result = await controller.findAll();

    expect(result).toEqual(cats);
    expect(mockCatService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return cat greeting', () => {
    mockCatService.catGreeting.mockReturnValue('cat says hi');

    const result = controller.catSayHi();

    expect(result).toBe('cat says hi');
    expect(mockCatService.catGreeting).toHaveBeenCalledTimes(1);
  });

  it('should return a single cat by ID', async () => {
    const cat: Cat = { id: 1, name: 'Cat 1', age: 2 };
    mockCatService.findOne.mockResolvedValueOnce(cat);

    const result = await controller.findOne('1');

    expect(result).toEqual(cat);
    expect(mockCatService.findOne).toHaveBeenCalledWith(1);
    expect(mockCatService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should delete a cat by ID', async () => {
    mockCatService.deleteCat.mockResolvedValueOnce(undefined);

    const result = await controller.deleteCat(1);

    expect(result).toBe('Cat with ID 1 has been deleted');
    expect(mockCatService.deleteCat).toHaveBeenCalledWith(1);
    expect(mockCatService.deleteCat).toHaveBeenCalledTimes(1);
  });
});