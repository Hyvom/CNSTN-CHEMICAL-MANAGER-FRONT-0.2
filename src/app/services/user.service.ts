import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  private authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  // -------------------- USER AUTH --------------------

  // Login user
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, credentials).pipe(
      tap((res: any) => localStorage.setItem('token', res)) // store JWT
    );
  }

  // Register new user
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register/user`, user);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // -------------------- USER MANAGEMENT --------------------

  // Get all users (Admin)
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get single user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Delete user (Admin)
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Enable or disable user (Admin)
  toggleUserStatus(id: number, enabled: boolean): Observable<any> {
    const url = enabled ? `${this.apiUrl}/${id}/enable` : `${this.apiUrl}/${id}/disable`;
    return this.http.put(url, {});
  }

  // Create user (Admin)
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
