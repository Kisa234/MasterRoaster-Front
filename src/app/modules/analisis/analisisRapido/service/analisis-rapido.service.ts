import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class AnalisisRapidoService {
  private baseUrl = `${environment.apiUrl}/analisisRapido`;

  constructor(private http: HttpClient) {}

  // Crear un nuevo análisis rápido
  createAnalisisRapido(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Obtener un análisis rápido por ID
  getAnalisisRapidoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Actualizar un análisis rápido
  updateAnalisisRapido(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
