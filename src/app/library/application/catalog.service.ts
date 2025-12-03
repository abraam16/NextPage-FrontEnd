/**
 * Library Context - Application - Catalog Service
 */

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BookRepository } from '../infrastructure/book.repository';
import { Book } from '../../shared/domain/models';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private bookRepository: BookRepository) {}

  getAllBooks(): Observable<Book[]> {
    return this.bookRepository.findAll();
  }

  searchBooks(searchTerm: string, genero?: string): Observable<Book[]> {
    return this.getAllBooks().pipe(
      map((books: Book[]) => {
        let result = books;
        
        if (genero && genero !== 'Todos') {
          result = result.filter(book => book.genero === genero);
        }
        
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          result = result.filter(book =>
            book.titulo.toLowerCase().includes(term) ||
            book.autor.toLowerCase().includes(term)
          );
        }
        
        return result;
      })
    );
  }

  getUniqueGenres(): Observable<string[]> {
    return this.getAllBooks().pipe(
      map(books => ['Todos', ...new Set(books.map(b => b.genero))])
    );
  }
}
