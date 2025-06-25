import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  route = inject(Router);
  showPassword = false;
  errorMessage = null;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  handleSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        console.log('Login success', data);
        localStorage.setItem(
          'token',
          (data as { accessToken: string }).accessToken
        );
        this.route.navigate(['/product/list']);
      },
      error: (e: HttpErrorResponse) => {
        this.errorMessage = e?.error || 'InValid';
      },
    });
  }
}
