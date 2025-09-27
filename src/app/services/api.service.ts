import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  enabled?: boolean;
}

export interface Admin {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export interface Produit {
  id?: number;
  nom: string;
  description: string;
  quantite: number;
  unite: string;
  dateExpiration: string;
  fournisseur: string;
  categorie: string;
}

export interface Request {
  id?: number;
  userId: number;
  produitId: number;
  quantiteDemandee: number;
  status?: string;
  validatedBy?: Admin;
  dateRequest?: string;
  dateValidation?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/api'; // Base URL of your back-end
  private authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  // ---------------- AUTH ----------------
  login(username: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.authUrl}/login`, { username, password });
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/register/user`, user);
  }

  registerAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.authUrl}/register/admin`, admin);
  }

  // ---------------- USERS ----------------
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  enableUser(id: number, enabled: boolean): Observable<void> {
    const url = enabled ? `${this.apiUrl}/users/${id}/enable` : `${this.apiUrl}/users/${id}/disable`;
    return this.http.put<void>(url, {});
  }

  // ---------------- ADMINS ----------------
  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/admins`);
  }

  getAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/admins/${id}`);
  }

  createAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/admins`, admin);
  }

  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admins/${id}`);
  }

  // ---------------- PRODUITS ----------------
  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/produits`);
  }

  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/produits/${id}`);
  }

  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/produits`, produit);
  }

  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/produits/${id}`, produit);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/produits/${id}`);
  }

  // ---------------- REQUESTS ----------------
  createRequest(request: Request): Observable<Request> {
    const params = `userId=${request.userId}&produitId=${request.produitId}&quantiteDemandee=${request.quantiteDemandee}`;
    return this.http.post<Request>(`${this.apiUrl}/requests?${params}`, {});
  }

  getRequestsByUser(userId: number): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/requests/user/${userId}`);
  }

  getAllPendingRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/requests/pending`);
  }

  approveRequest(requestId: number, adminId: number): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/requests/${requestId}/approve?adminId=${adminId}`, {});
  }

  rejectRequest(requestId: number, adminId: number): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/requests/${requestId}/reject?adminId=${adminId}`, {});
  }
}
