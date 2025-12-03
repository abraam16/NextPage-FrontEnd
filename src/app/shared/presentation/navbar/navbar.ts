import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../authentication/application/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent {

  nombreUsuario: string | null = null; // <-- AGREGADO

  constructor(public authService: AuthService, private router: Router) {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    window.location.reload();
  }
  
  getNavClass() {
    return this.authService.getCurrentUser()?.role === 'profesor'
      ? 'nav-links profesor'
      : 'nav-links';
  }

}
