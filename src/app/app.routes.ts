import { Routes } from '@angular/router';

// Importamos tus páginas CON LOS NOMBRES REALES de las clases
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
import { CatalogoComponent } from './pages/catalogo/catalogo';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard';
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  { path: 'catalogo', component: CatalogoComponent },

  { path: 'admin-panel', component: AdminPanelComponent },

  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent },

  { path: '**', redirectTo: '' }
];
