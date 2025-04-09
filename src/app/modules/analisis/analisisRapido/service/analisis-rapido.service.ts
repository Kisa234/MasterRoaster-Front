import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/enviroments';
import { AnalisisSensorial } from '../../../../interfaces/analisisSensorial.interface';


@Injectable({
  providedIn: 'root'
})
export class AnalisisSensorialService {

  private baseUrl = `${environment.apiUrl}/analisisSensorial`;

  constructor(private http: HttpClient) {}

  createAnalisis(data: AnalisisSensorial): Observable<AnalisisSensorial> {
    return this.http.post<AnalisisSensorial>(`${this.baseUrl}`, data);
  }

  getAnalisisById(id: string): Observable<AnalisisSensorial> {
    return this.http.get<AnalisisSensorial>(`${this.baseUrl}/${id}`);
  }

  updateAnalisis(id: string, data: AnalisisSensorial): Observable<AnalisisSensorial> {
    return this.http.put<AnalisisSensorial>(`${this.baseUrl}/${id}`, data);
  }

  getAllAnalisis(): Observable<AnalisisSensorial[]> {
    return this.http.get<AnalisisSensorial[]>(`${this.baseUrl}/all`);
  }

  deleteAnalisis(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
