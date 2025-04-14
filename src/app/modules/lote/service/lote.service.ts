import { Observable } from "rxjs";
import { Lote } from "../../../interfaces/lote.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../enviroments/enviroments";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private baseUrl = `${environment.apiUrl}/lote`;

  constructor(private http: HttpClient) {
  }

  createLote(data: Lote): Observable<Lote> {
    return this.http.post<Lote>(this.baseUrl, data);
  }

  getLoteById(id: string): Observable<Lote> {
    return this.http.get<Lote>(`${this.baseUrl}/${id}`);
  }

  updateLote(id: string, data: Lote): Observable<Lote> {
    return this.http.put<Lote>(`${this.baseUrl}/${id}`, data);
  }

  deleteLote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getLotes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${this.baseUrl}`);
  }

  createLoteFromMuestra(id_muestra:string, peso:number): Observable<Lote>{
    return this.http.post<Lote>(`${this.baseUrl}/muestra/${id_muestra}`, {peso});
  }  
}
