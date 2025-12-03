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
  isLoading = false;

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

    if(this.isLoading) {
      console.warn('⚠️ Login already in progress, ignoring duplicate request');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.isLoading = true;
    this.errorLogin = null;
    
    console.log('🚀 Sending login request...');
    
    this.authService.login({ email, password }).subscribe({
      next: (result) => {
        console.log('✅ Login response received:', result);
        this.isLoading = false;
        if (result.success) {
          console.log('✅ Login successful, navigating to home');
          this.router.navigate(['/']);
        } else {
          console.error('❌ Login failed:', result.error);
          this.errorLogin = result.error || 'Credenciales incorrectas';
        }
      },
      error: (err) => {
        console.error('❌ Login error:', err);
        this.isLoading = false;
        this.errorLogin = 'Error al iniciar sesión. Verifica que el backend esté corriendo.';
      }
    });
  }
}
