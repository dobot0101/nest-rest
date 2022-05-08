import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find(movie => movie.id === parseInt(id));
    if (!movie) throw new NotFoundException(`movie id: ${id} isn't found.`);
    return movie;
  }

  create(movieData) {
    return this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  deleteOne(id: string): boolean {
    this.getOne(id);
    this.movies = this.movies.filter(movie => movie.id !== parseInt(id));
    return true;
  }

  update(id: string, data: Movie) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({
      ...movie,
      ...data,
    });
  }
}
