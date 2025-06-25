import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

//CommonModule: Chứa các directive cơ bản của Angular như *ngIf, *ngFor, và các pipe như async

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);
  route = inject(Router);
  showPassword = false;
  errorMessage = null;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  handleSubmit() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        alert('OK');
        this.route.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.errorMessage = e?.error || 'InValid';
      },
    });
  }
}
