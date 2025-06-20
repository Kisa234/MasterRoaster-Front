import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/enviroments';
import { AnalisisSensorial } from '../../../../interfaces/analisisSensorial.interface';

@Injectable({
  providedIn: 'root'
})
export class AnalisisSensorialService {
  private baseUrl = `${environment.apiUrl}/AnalisisSensorial`;

  constructor(private http: HttpClient) {}

  // Crear un nuevo análisis sensorial
  createAnalisisSensorial(data: AnalisisSensorial): Observable<AnalisisSensorial> {
    return this.http.post<AnalisisSensorial>(`${this.baseUrl}`, data);
  }

  // Obtener un análisis sensorial por ID
  getAnalisisById(id: string): Observable<AnalisisSensorial> {
    return this.http.get<AnalisisSensorial>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un análisis sensorial
  updateAnalisisSensorial(id: string, data: AnalisisSensorial): Observable<AnalisisSensorial> {
    return this.http.put<AnalisisSensorial>(`${this.baseUrl}/${id}`, data);
  }

  // Obtener todos los análisis sensoriales
  getAllAnalisisSensorial(): Observable<AnalisisSensorial[]> {
    return this.http.get<AnalisisSensorial[]>(`${this.baseUrl}`);
  }

  // Eliminar un análisis sensorial por ID
  deleteAnalisisSensorial(id: string): Observable<AnalisisSensorial> {
    return this.http.delete<AnalisisSensorial>(`${this.baseUrl}/${id}`);
  }
}
