import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './features/auth/services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import {  MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'estudiantes-app';

  isLoggingOut = false;


  private authService = inject(AuthService);
  private router = inject(Router);
  isLoggedIn$() {
    return this.authService.isLoggedIn$();
  }

  logout() {
    this.isLoggingOut = true;
    setTimeout(() => {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isLoggingOut = false;
    }, 1500);
  }
}
