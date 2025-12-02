import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LIBROS_DATA } from '../data.libros'; // <-- ruta CORRECTA

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

  ngOnInit(): void {
    // Nombre del usuario (ejemplo: desde el login guardaste en localStorage)
    this.nombreAlumno = localStorage.getItem('nombreUsuario') || 'Estudiante';

    // Tomamos algunos libros del data central (por ejemplo los primeros 3)
    const seleccion = LIBROS_DATA.slice(0, 3);

    // Mapeamos al formato del dashboard (cover, progreso, etc.)
    this.librosAsignados = seleccion.map(libro => ({
      id: libro.id ?? Math.floor(Math.random() * 10000),
      titulo: libro.titulo,
      autor: libro.autor ?? 'Autor desconocido',
      progreso: Math.floor(Math.random() * 91), // valor ejemplo 0-90%
      cover: libro.portada
    }));
  }

  continuarLeyendo(libro: any) {
    alert(`Continuando la lectura de: ${libro.titulo}`);
  }
}
