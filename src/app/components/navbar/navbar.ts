import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent {

  nombreUsuario: string | null = null; // <-- AGREGADO

  constructor(public userService: UserService, private router: Router) {
    // <-- AGREGADO
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
  }

  logout() {
    this.userService.logout();
    localStorage.clear(); // <-- Necesario para limpiar el nombre
    this.router.navigate(['/']);
    window.location.reload(); // <-- refresca el navbar
  }
  getNavClass() {
  return this.userService.getCurrentUser()?.role === 'profesor'
    ? 'nav-links profesor'
    : 'nav-links';
}

}
