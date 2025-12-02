import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent implements OnInit {
  libros: any[] = [
    { id: 1, titulo: 'La Sombra del Viento', autor: 'Carlos Ruiz Zafón', genero: 'Misterio', disponible: true, rating: 4.8, descripcion: 'Una historia llena de intriga y secretos en la Barcelona de los años 40.', portada: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1455148533i/29066187.jpg' },
    { id: 2, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', genero: 'Realismo Mágico', disponible: true, rating: 4.9, descripcion: 'Saga familiar de los Buendía en el mítico pueblo de Macondo.', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5kpppo5ikAeZl9wgxgbG1pLxvAoPXIdoLw&s' },
    { id: 3, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', genero: 'Ficción', disponible: true, rating: 4.7, descripcion: 'Un pequeño príncipe viaja por planetas aprendiendo lecciones de vida.', portada: 'https://portallibros.com/wp-content/uploads/2021/02/El-principito.jpg' },
    { id: 4, titulo: 'Sapiens: De animales a dioses', autor: 'Yuval Noah Harari', genero: 'No Ficción', disponible: true, rating: 4.5, descripcion: 'Historia de la humanidad desde sus orígenes hasta la actualidad.', portada: 'https://www.penguinlibros.com/pe/1675383/sapiens-de-animales-a-dioses.jpg' },
    { id: 5, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', genero: 'Clásico', disponible: true, rating: 4.4, descripcion: 'Las aventuras de un caballero que confunde la fantasía con la realidad.', portada: 'https://pendulo.com/imagenes_grandes/9788408/978840827088.GIF' },
    { id: 6, titulo: 'Crimen y Castigo', autor: 'Fiódor Dostoievski', genero: 'Clásico', disponible: false, rating: 4.6, descripcion: 'El dilema moral de un joven que comete un asesinato.', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yGj9XgUKEFiomsAeBf7adsewOCsXO_p8HA&s' },
    { id: 7, titulo: '1984', autor: 'George Orwell', genero: 'Distopía', disponible: true, rating: 4.9, descripcion: 'Una sociedad totalitaria vigilada por el Gran Hermano.', portada: 'https://imgv2-2-f.scribdassets.com/img/word_document/603486960/original/0468b5a5b9/1?v=1' },
    { id: 8, titulo: 'Harry Potter y la Piedra Filosofal', autor: 'J.K. Rowling', genero: 'Fantasía', disponible: true, rating: 4.7, descripcion: 'El inicio de la saga mágica de Harry Potter en Hogwarts.', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlbCqtYbdux0bHIkYL3nSYks1GcN6XUZ7HHQ&s' },
    { id: 9, titulo: 'El Código Da Vinci', autor: 'Dan Brown', genero: 'Suspenso', disponible: true, rating: 4.6, descripcion: 'Un thriller de misterio que combina arte y religión.', portada: 'https://images.cdn2.buscalibre.com/fit-in/360x360/ef/0f/ef0fe302954a688d71d2a988393ad609.jpg' },
    { id: 10, titulo: 'Orgullo y Prejuicio', autor: 'Jane Austen', genero: 'Romance', disponible: true, rating: 4.5, descripcion: 'El romance y la crítica social en la Inglaterra del siglo XIX.', portada: 'https://www.elvirrey.com/imagenes/9788415/978841561878.GIF' },
    { id: 11, titulo: 'El Hobbit', autor: 'J.R.R. Tolkien', genero: 'Fantasía', disponible: true, rating: 4.8, descripcion: 'Bilbo Bolsón inicia una aventura épica para recuperar un tesoro.', portada: 'https://0.academia-photos.com/attachment_thumbnails/56865141/mini_magick20220703-28588-vl2juy.png?1656882956' },
    { id: 12, titulo: 'La Odisea', autor: 'Homero', genero: 'Épica', disponible: true, rating: 4.4, descripcion: 'El viaje de Odiseo para regresar a su hogar tras la guerra de Troya.', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fcCStUAcpnQLrZL08Hh7Ii9s3SnF7Oa2ig&s' },
    // Nuevos libros
    { id: 13, titulo: 'Matar a un ruiseñor', autor: 'Harper Lee', genero: 'Drama', disponible: true, rating: 4.7, descripcion: 'Una historia de justicia y racismo en el sur de Estados Unidos.', portada: 'https://www.libreriasur.com.pe/imagenes/9788417/978841721694.webp' },
    { id: 14, titulo: 'El nombre del viento', autor: 'Patrick Rothfuss', genero: 'Fantasía', disponible: true, rating: 4.8, descripcion: 'Kvothe narra su historia como mago y músico en un mundo mágico.', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9prgli2QMdP1PxcY5_Jio-59-vdJtPWztnA&s' },
    { id: 15, titulo: 'La chica del tren', autor: 'Paula Hawkins', genero: 'Thriller', disponible: true, rating: 4.3, descripcion: 'Misterio y suspense alrededor de la desaparición de una mujer.', portada: 'https://www.planetadelibros.com.pe/usuaris/libros/fotos/199/original/portada_la-chica-del-tren_paula-hawkins_201611281622.jpg' },
    { id: 16, titulo: 'El alquimista', autor: 'Paulo Coelho', genero: 'Ficción', disponible: true, rating: 4.6, descripcion: 'Santiago busca su destino en una aventura llena de sabiduría y sueños.', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbtrlr7y1xIGkIQBiCaWq7bSzRiM5VmZR-8A&s' },
    { id: 17, titulo: 'Los juegos del hambre', autor: 'Suzanne Collins', genero: 'Distopía', disponible: true, rating: 4.5, descripcion: 'Katniss Everdeen lucha por sobrevivir en una sociedad opresiva.', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK0s2-lkDLtQTyBCsZ54a5ZCT75R3B-20xyw&s' },
    { id: 18, titulo: 'Drácula', autor: 'Bram Stoker', genero: 'Terror', disponible: true, rating: 4.4, descripcion: 'El clásico vampírico que da origen a la leyenda de Drácula.', portada: 'https://www.elejandria.com/covers/Dracula-Stoker_Bram-lg.png' }
  ];

  librosFiltrados: any[] = [];
  searchTerm: string = '';
  selectedGenero: string = 'Todos';
  generosUnicos: string[] = [];
  libroSeleccionado: any = null;

  ngOnInit(): void {
    this.librosFiltrados = this.libros;
    this.generosUnicos = ['Todos', ...new Set(this.libros.map(libro => libro.genero))];
  }

  getGenreTag(genero: string): string {
    return genero.toLowerCase().replace(/ /g, '-');
  }

  aplicarFiltros() {
    let tempLibros = this.libros;

    if (this.selectedGenero !== 'Todos') {
      tempLibros = tempLibros.filter(libro => libro.genero === this.selectedGenero);
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

  verDetalle(libro: any) {
    this.libroSeleccionado = libro;
  }

  cerrarDetalle() {
    this.libroSeleccionado = null;
  }

  solicitarLibro(libro: any) {
    alert(`Solicitado: ${libro.titulo}. Lógica de asignación al usuario.`);
  }
}
