import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanelComponent implements OnInit {
  nombreAdmin: string = 'Super Administrador';

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

  libros: any[] = [
    { id: 1, titulo: 'La Sombra del Viento', autor: 'Carlos Ruiz Zafón', genero: 'Misterio', disponible: true, rating: 4.8, portada: '', descripcion: 'Una novela cautivadora de misterio y aventuras.' },
    { id: 2, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', genero: 'Realismo Mágico', disponible: true, rating: 4.9, portada: '', descripcion: 'Clásico de realismo mágico que narra la historia de Macondo.' },
    { id: 3, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', genero: 'Ficción', disponible: true, rating: 4.7, portada: '', descripcion: 'Fábula poética sobre la vida y la amistad.' },
  ];

  librosFiltrados: any[] = [];
  searchTerm: string = '';
  selectedGenero: string = 'Todos';
  generosUnicos: string[] = [];
  editingLibro: any = null;

  ngOnInit(): void {
    this.librosFiltrados = this.libros;
    this.generosUnicos = ['Todos', ...new Set(this.libros.map(l => l.genero))];
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
