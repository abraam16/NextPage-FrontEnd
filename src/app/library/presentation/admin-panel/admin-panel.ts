import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../application/catalog.service';
import { Book } from '../../../shared/domain/models';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanelComponent implements OnInit {
  nombreAdmin: string = 'Super Administrador';

  constructor(private catalogService: CatalogService) {}

  stats = [
    { title: 'Total Alumnos', value: 875, icon: '🎓' },
    { title: 'Total Profesores', value: 35, icon: '👩‍🏫' },
    { title: 'Libros en Catálogo', value: 124, icon: '📚' },
    { title: 'Clases Activas', value: 42, icon: '🏫' },
  ];

  managementModules = [
    { name: 'Gestión de Usuarios', description: 'Crear, editar o eliminar cuentas de Alumnos y Profesores.', route: '/admin/usuarios', icon: '👥' },
    { name: 'Gestión de Contenido', description: 'Añadir o modificar libros y material didáctico.', route: '/admin/contenido', icon: '📝' },
    { name: 'Gestión de Cursos', description: 'Asignar profesores a clases y configurar niveles.', route: '/admin/cursos', icon: '⚙️' },
    { name: 'Reportes y Analíticas', description: 'Ver gráficos de progreso de lectura y rendimiento.', route: '/admin/reportes', icon: '📊' },
  ];

  libros: Book[] = [];
  librosFiltrados: Book[] = [];
  searchTerm: string = '';
  selectedGenero: string = 'Todos';
  generosUnicos: string[] = [];
  editingLibro: any = null;

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('nombreUsuario');
    if (usuarioGuardado) {
      this.nombreAdmin = usuarioGuardado;
    }

    this.catalogService.getAllBooks().subscribe({
      next: (books) => {
        this.libros = books;
        this.librosFiltrados = books;
        this.generosUnicos = ['Todos', ...new Set(books.map(l => l.genero))];
      },
      error: (error) => console.error('Error cargando libros:', error)
    });
  }

  navegarAModulo(ruta: string) {
    alert(`Navegando a: ${ruta}`);
  }

  aplicarFiltros() {
    let temp = this.libros;
    if (this.selectedGenero !== 'Todos') {
      temp = temp.filter(l => l.genero === this.selectedGenero);
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      temp = temp.filter(l => l.titulo.toLowerCase().includes(term) || l.autor.toLowerCase().includes(term));
    }
    this.librosFiltrados = temp;
  }

  addLibro() {
    const nuevo = { id: this.libros.length+1, titulo:'Nuevo Libro', autor:'Autor', genero:'Ficción', disponible:true, rating:0, portada:'', descripcion:'' };
    this.libros.push(nuevo);
    this.aplicarFiltros();
    this.editingLibro = nuevo;
  }

  editLibro(libro: any) { this.editingLibro = {...libro}; }
  saveLibro() {
    const idx = this.libros.findIndex(l=>l.id===this.editingLibro.id);
    if(idx!==-1){ this.libros[idx]=this.editingLibro; this.aplicarFiltros(); this.editingLibro=null; }
  }
  cancelEdit() { this.editingLibro=null; }
  deleteLibro(libro: any){ this.libros=this.libros.filter(l=>l.id!==libro.id); this.aplicarFiltros(); }
}
