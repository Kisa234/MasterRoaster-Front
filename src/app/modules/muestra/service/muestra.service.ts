import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Muestra } from '../../../interfaces/muestra.interface';
import { environment } from '../../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class MuestraService {

  private readonly baseUrl = `${environment.apiUrl}/muestra`; // Cambia a la URL de tu backend

  constructor(private http: HttpClient) { }

  createMuestra(data: Muestra): Observable<Muestra> {
    return this.http.post<Muestra>(`${this.baseUrl}`, data);
  }

  getMuestras(): Observable<Muestra[]> {
    return this.http.get<Muestra[]>(`${this.baseUrl}`);
  }


  getMuestraById(id: string): Observable<Muestra> {
    return this.http.get<Muestra>(`${this.baseUrl}/${id}`);
  }

  updateMuestra(id: string, data: Muestra): Observable<Muestra> {
    return this.http.put<Muestra>(`${this.baseUrl}/${id}`, data);
  }

  deleteMuestra(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
