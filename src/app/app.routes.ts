import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from '../app/auth.guard'; // your AuthGuard
import { FooterComponent } from './footer/footer.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard] },
  { path: 'produits', component: ProduitsComponent, canActivate: [AuthGuard] },
  { path: 'admins', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },

];
