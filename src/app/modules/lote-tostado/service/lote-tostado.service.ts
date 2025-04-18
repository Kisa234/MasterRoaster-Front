import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoteTostado } from '../../../interfaces/loteTostado.interface';
import { environment } from '../../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class LoteTostadoService {

  private readonly baseUrl = `${environment.apiUrl}/loteTostado`;

  constructor(private http: HttpClient) {}

  createLoteTostado(data: LoteTostado): Observable<LoteTostado> {
    return this.http.post<LoteTostado>(`${this.baseUrl}`, data);
  }

  getLotesTostados(): Observable<LoteTostado[]> {
    return this.http.get<LoteTostado[]>(`${this.baseUrl}`);
  }

  getLoteTostadoById(id: string): Observable<LoteTostado> {
    return this.http.get<LoteTostado>(`${this.baseUrl}/${id}`);
  }

  updateLoteTostado(id: string, data: LoteTostado): Observable<LoteTostado> {
    return this.http.put<LoteTostado>(`${this.baseUrl}/${id}`, data);
  }

  deleteLoteTostado(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getLotesTostadoByLoteId(id: string): Observable<LoteTostado[]> {
    return this.http.get<LoteTostado[]>(`${this.baseUrl}/lote/${id}`);
  }
}
