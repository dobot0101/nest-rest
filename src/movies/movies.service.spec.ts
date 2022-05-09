import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should be an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        genres: ['test'],
        title: 'test',
        year: 2022,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      service.create({
        genres: ['test'],
        title: 'test',
        year: 2022,
      });

      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        genres: ['test'],
        title: 'test',
        year: 2022,
      });

      service.update(1, {
        title: 'updated title',
      });

      const afterUpdate = service.getOne(1);

      expect(afterUpdate.title).toEqual('updated title');
    });
  });
});
