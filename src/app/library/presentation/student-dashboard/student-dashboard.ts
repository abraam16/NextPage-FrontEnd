import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../../application/catalog.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboardComponent implements OnInit {

  nombreAlumno: string = '';
  puntos: number = 150;
  librosAsignados: any[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.nombreAlumno = localStorage.getItem('nombreUsuario') || 'Estudiante';

    // Cargar libros desde el servidor y tomar los primeros 3
    this.catalogService.getAllBooks().subscribe({
      next: (books) => {
        const seleccion = books.slice(0, 3);

        this.librosAsignados = seleccion.map(libro => ({
          id: libro.id,
          titulo: libro.titulo,
          autor: libro.autor,
          progreso: Math.floor(Math.random() * 91),
          cover: libro.portada
        }));
      },
      error: (error) => console.error('Error cargando libros:', error)
    });
  }

  continuarLeyendo(libro: any) {
    alert(`Continuando la lectura de: ${libro.titulo}`);
  }
}
