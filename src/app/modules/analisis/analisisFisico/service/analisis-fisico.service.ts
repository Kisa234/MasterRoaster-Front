import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class AnalisisFisicoService {
  private baseUrl = `${environment.apiUrl}/analisisFisico`;

  constructor(private http: HttpClient) {}

  // Crear un nuevo análisis físico
  createAnalisisFisico(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Obtener un análisis físico por ID
  getAnalisisFisicoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Actualizar un análisis físico
  updateAnalisisFisico(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
