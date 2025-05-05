import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../../../interfaces/pedido.interface';
import { environment } from '../../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly baseUrl = `${environment.apiUrl}/pedido`;

  constructor(private http: HttpClient) {}

  createPedido(data: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.baseUrl}`, data);
  }

  getPedidoById(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${id}`);
  }

  updatePedido(id: string, data: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.baseUrl}/${id}`, data);
  }

  deletePedido(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getPedidosByEstado(estado: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/estado/${estado}`);
  }

  getPedidosByCliente(clienteId: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/cliente/${clienteId}`);
  }

  completarPedido(id: string): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.baseUrl}/completar/${id}`, {});
  }

  getAllPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}`);
  }
  getPedidosOrdenTueste(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/orden/tueste`);
  }
}
