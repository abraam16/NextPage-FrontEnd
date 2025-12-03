import { Routes } from '@angular/router';

// Authentication Context - Presentation
import { LoginComponent } from './authentication/presentation/login/login';
import { RegistroComponent } from './authentication/presentation/registro/registro';

// Library Context - Presentation
import { HomeComponent } from './library/presentation/home/home';
import { CatalogoComponent } from './library/presentation/catalogo/catalogo';
import { AdminPanelComponent } from './library/presentation/admin-panel/admin-panel';
import { StudentDashboardComponent } from './library/presentation/student-dashboard/student-dashboard';

// Academic Context - Presentation
import { TeacherDashboardComponent } from './academic/presentation/teacher-dashboard/teacher-dashboard';

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
