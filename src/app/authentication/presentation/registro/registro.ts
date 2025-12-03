import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../application/auth.service';
import { User } from '../../../shared/domain/models';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  errorRegistro: string | null = null;
  registroExitoso = false;

  roles: string[] = ['alumno', 'profesor', 'otro'];
  grados: string[] = ['Primaria', 'Secundaria'];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['otro', Validators.required],
      // Campos dinámicos
      grado: [''],
      seccion: [''],
      colegio: [''],
      ciudad: [''],
      curso: ['']
    }, { validators: this.passwordMatchValidator });

    // Ajustar validaciones dinámicas según el rol
    this.registroForm.get('role')?.valueChanges.subscribe(role => {
      if(role === 'alumno') {
        this.registroForm.get('grado')?.setValidators(Validators.required);
        this.registroForm.get('seccion')?.setValidators(Validators.required);
        this.registroForm.get('colegio')?.setValidators(Validators.required);
        this.registroForm.get('ciudad')?.setValidators(Validators.required);
        this.registroForm.get('curso')?.clearValidators();
      } else if(role === 'profesor') {
        this.registroForm.get('curso')?.setValidators(Validators.required);
        this.registroForm.get('colegio')?.setValidators(Validators.required);
        this.registroForm.get('grado')?.clearValidators();
        this.registroForm.get('seccion')?.clearValidators();
        this.registroForm.get('ciudad')?.clearValidators();
      } else {
        // Otro/normal
        this.registroForm.get('grado')?.clearValidators();
        this.registroForm.get('seccion')?.clearValidators();
        this.registroForm.get('colegio')?.clearValidators();
        this.registroForm.get('ciudad')?.clearValidators();
        this.registroForm.get('curso')?.clearValidators();
      }
      // Actualizamos el estado de validación
      this.registroForm.get('grado')?.updateValueAndValidity();
      this.registroForm.get('seccion')?.updateValueAndValidity();
      this.registroForm.get('colegio')?.updateValueAndValidity();
      this.registroForm.get('ciudad')?.updateValueAndValidity();
      this.registroForm.get('curso')?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if(this.registroForm.invalid){
      this.registroForm.markAllAsTouched();
      this.errorRegistro = 'Completa todos los campos correctamente.';
      return;
    }

    const userData: Partial<User> = this.registroForm.value;
    
    this.authService.register(userData).subscribe({
      next: () => {
        this.registroExitoso = true;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.errorRegistro = 'El email ya está registrado.';
      }
    });
  }
}
