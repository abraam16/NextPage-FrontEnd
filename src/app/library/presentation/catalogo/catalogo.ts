import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../application/catalog.service';
import { Book } from '../../../shared/domain/models';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent implements OnInit {
  libros: Book[] = [];
  librosFiltrados: Book[] = [];
  searchTerm: string = '';
  generoSeleccionado: string = 'Todos';
  generos: string[] = ['Todos', 'Misterio', 'Realismo Mágico', 'Ficción', 'No Ficción', 'Clásico', 'Distopía', 'Fantasía', 'Suspenso', 'Romance', 'Épica', 'Drama', 'Thriller', 'Terror'];
  libroSeleccionado: Book | null = null;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogService.getAllBooks().subscribe({
      next: (books) => {
        this.libros = books;
        this.librosFiltrados = books;
      },
      error: (error) => console.error('Error cargando libros:', error)
    });
  }

  getGenreTag(genero: string): string {
    return genero.toLowerCase().replace(/ /g, '-');
  }

  aplicarFiltros() {
    let tempLibros = this.libros;

    if (this.generoSeleccionado !== 'Todos') {
      tempLibros = tempLibros.filter(libro => libro.genero === this.generoSeleccionado);
    }

    if (this.searchTerm) {
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      tempLibros = tempLibros.filter(libro =>
        libro.titulo.toLowerCase().includes(lowerSearchTerm) ||
        libro.autor.toLowerCase().includes(lowerSearchTerm)
      );
    }

    this.librosFiltrados = tempLibros;
  }

  verDetalle(libro: Book) {
    this.libroSeleccionado = libro;
  }

  cerrarDetalle() {
    this.libroSeleccionado = null;
  }

  solicitarLibro(libro: Book) {
    alert(`Solicitado: ${libro.titulo}. Lógica de asignación al usuario.`);
  }
}

