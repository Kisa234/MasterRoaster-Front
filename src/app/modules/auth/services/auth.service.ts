import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Obtener un usuario por ID
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Obtener usuarios por rol
  getUsersByRole(role: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/role/${role}`);
  }

  // Crear un nuevo usuario
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Actualizar un usuario
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
