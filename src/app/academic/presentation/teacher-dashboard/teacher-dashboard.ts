// src/app/academic/presentation/teacher-dashboard/teacher-dashboard.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngIf, *ngFor

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule], 
  // Asegúrate de que las URLs de los templates sigan tu convención (sin .component)
  templateUrl: './teacher-dashboard.html', 
  styleUrl: './teacher-dashboard.css'
})
export class TeacherDashboardComponent implements OnInit {
  nombreProfesor: string = 'Lic. Pérez'; // Nombre simulado
  materia: string = 'Literatura y Lenguaje';

  // Cursos a cargo del profesor
  cursos = [
    { id: 1, nombre: '5to Secundaria', alumnos: 32, promedioLectura: 65 },
    { id: 2, nombre: '4to Secundaria', alumnos: 28, promedioLectura: 78 },
    { id: 3, nombre: '1er Bachillerato', alumnos: 25, promedioLectura: 50 },
  ];

  // Actividades pendientes
  actividadesPendientes = [
    { id: 501, tipo: 'Revisión', descripcion: 'Ensayo sobre "El Quijote" (5to Sec.)', fechaLimite: '2025-12-01' },
    { id: 502, tipo: 'Evaluación', descripcion: 'Cuestionario de "Cien años de soledad" (4to Sec.)', fechaLimite: '2025-11-28' },
    { id: 503, tipo: 'Asignación', descripcion: 'Asignar nuevo libro a 1er Bachillerato', fechaLimite: '2025-11-25' },
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí, en el futuro, se realizarán las llamadas a la API de Java.
  }

  verDetalleCurso(curso: any) {
    alert(`Navegando al detalle del curso: ${curso.nombre}`);
    // En el futuro: this.router.navigate(['/profesor/curso', curso.id]);
  }

  marcarCompleto(actividad: any) {
    // Lógica para marcar como completado.
    const index = this.actividadesPendientes.indexOf(actividad);
    if (index > -1) {
      this.actividadesPendientes.splice(index, 1);
      alert(`Actividad "${actividad.descripcion}" marcada como completada.`);
    }
  }
}