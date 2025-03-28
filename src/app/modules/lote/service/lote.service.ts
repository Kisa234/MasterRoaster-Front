import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private baseUrl = `${environment.apiUrl}/lote`;

  constructor(private http: HttpClient) {}

  // Crear un nuevo lote
  createLote(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Obtener un lote por ID
  getLoteById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Actualizar un lote
  updateLote(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Eliminar un lote
  deleteLote(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Obtener lotes por estado
  getLotesByEstado(estado: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/estado/${estado}`);
  }
}
