import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class AnalisisSensorialService {
  private baseUrl = `${environment.apiUrl}/analisisSensorial`;

  constructor(private http: HttpClient) {}

  // Crear un nuevo análisis sensorial
  createAnalisisSensorial(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Obtener un análisis sensorial por ID
  getAnalisisSensorialById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Actualizar un análisis sensorial
  updateAnalisisSensorial(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
