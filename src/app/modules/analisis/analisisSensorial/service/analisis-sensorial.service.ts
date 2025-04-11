import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/enviroments';
import { analisisSensorial } from '../../../../interfaces/analisisSensorial.interface';

@Injectable({
  providedIn: 'root'
})
export class AnalisisSensorialService {
  private baseUrl = `${environment.apiUrl}/analisisSensorial`;

  constructor(private http: HttpClient) {}

  // Crear un nuevo análisis sensorial
  createAnalisisSensorial(data: analisisSensorial): Observable<analisisSensorial> {
    return this.http.post<analisisSensorial>(`${this.baseUrl}`, data);
  }

  // Obtener un análisis sensorial por ID
  getAnalisisSensorialById(id: string): Observable<analisisSensorial> {
    return this.http.get<analisisSensorial>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un análisis sensorial
  updateAnalisisSensorial(id: string, data: analisisSensorial): Observable<analisisSensorial> {
    return this.http.put<analisisSensorial>(`${this.baseUrl}/${id}`, data);
  }

  // Obtener todos los análisis sensoriales
  getAllAnalisisSensorial(): Observable<analisisSensorial[]> {
    return this.http.get<analisisSensorial[]>(`${this.baseUrl}`);
  }

  // Eliminar un análisis sensorial por ID
  deleteAnalisisSensorial(id: string): Observable<analisisSensorial> {
    return this.http.delete<analisisSensorial>(`${this.baseUrl}/${id}`);
  }
}
