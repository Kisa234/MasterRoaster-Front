import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/enviroments';
import { AnalisisFisico } from '../../../../interfaces/analisisFisico.interface';


@Injectable({
  providedIn: 'root'
})
export class AnalisisFisicoService {

  private baseUrl = `${environment.apiUrl}/analisisFisico`;

  constructor(private http: HttpClient) {}

  createAnalisis(data: AnalisisFisico): Observable<AnalisisFisico> {
    return this.http.post<AnalisisFisico>(`${this.baseUrl}`, data);
  }

  getAnalisisById(id: string): Observable<AnalisisFisico> {
    return this.http.get<AnalisisFisico>(`${this.baseUrl}/${id}`);
  }

  updateAnalisis(id: string, data: AnalisisFisico): Observable<AnalisisFisico> {
    return this.http.put<AnalisisFisico>(`${this.baseUrl}/${id}`, data);
  }

  getAllAnalisis(): Observable<AnalisisFisico[]> {
    return this.http.get<AnalisisFisico[]>(`${this.baseUrl}`);
  }

  deleteAnalisis(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
