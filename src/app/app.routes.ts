// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Import all standalone components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { FooterComponent } from './components/footer/footer.component';
// import { AdminComponent } from './components/admin/admin.component'; // Uncomment if Admin exists
import { AuthGuard } from '../app/auth.guard'; // your route guard

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component : AppNavbarComponent},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard] },
  { path: 'produits', component: ProduitsComponent, canActivate: [AuthGuard] },

  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }, // optional admin route

  // fallback route
  { path: '**', redirectTo: 'dashboard' }
];
