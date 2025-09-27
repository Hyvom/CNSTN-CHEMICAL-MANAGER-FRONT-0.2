import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private router = inject(Router);
  private userService = inject(UserService);

  canActivate(): boolean {
    const isLoggedIn = this.userService.isLoggedIn(); // Check login status
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
    return true;
  }
}
