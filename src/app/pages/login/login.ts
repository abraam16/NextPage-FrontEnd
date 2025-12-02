import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorLogin: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      this.errorLogin = 'Por favor, completa los campos correctamente';
      return;
    }

    const { email, password } = this.loginForm.value;
    const user = this.userService.login(email, password);

    if(user) {

      // ✅ AGREGADO: Guardar usuario completo en localStorage
      localStorage.setItem('loggedUser', JSON.stringify(user));

      // Tus líneas, no moví nada
      localStorage.setItem('nombreUsuario', user.nombre);
      localStorage.setItem('rolUsuario', user.role);

      this.router.navigate(['/']); // redirige al home
    } else {
      this.errorLogin = 'Credenciales incorrectas.';
    }
  }
}
