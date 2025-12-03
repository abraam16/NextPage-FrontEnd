import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../application/auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

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
    
    this.authService.login({ email, password }).subscribe({
      next: (result) => {
        if (result.success) {
          this.router.navigate(['/']);
        } else {
          this.errorLogin = result.error || 'Credenciales incorrectas';
        }
      },
      error: () => {
        this.errorLogin = 'Error al iniciar sesión';
      }
    });
  }
}
