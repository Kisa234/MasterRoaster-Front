import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private alertaSubject = new Subject<{ tipo: 'success' | 'error' | 'info' | 'warning', mensaje: string }>();

  alerta$ = this.alertaSubject.asObservable();

  mostrar(tipo: 'success' | 'error' | 'info' | 'warning', mensaje: string) {
    this.alertaSubject.next({ tipo, mensaje });
  }
}
