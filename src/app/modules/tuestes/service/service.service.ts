import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tueste } from '../../../interfaces/tueste.interface';
import { environment } from '../../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class TuesteService {

  private readonly baseUrl = `${environment.apiUrl}/tueste`;

  constructor(private http: HttpClient) {}

  createTueste(data: Tueste): Observable<Tueste> {
    return this.http.post<Tueste>(`${this.baseUrl}`, data);
  }

  getTuesteById(id: string): Observable<Tueste> {
    return this.http.get<Tueste>(`${this.baseUrl}/${id}`);
  }

  updateTueste(id: string, data: Tueste): Observable<Tueste> {
    return this.http.put<Tueste>(`${this.baseUrl}/${id}`, data);
  }

  deleteTueste(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getTuesteByFecha(fecha: string): Observable<Tueste[]> {
    return this.http.get<Tueste[]>(`${this.baseUrl}/fecha/${fecha}`);
  }
}
