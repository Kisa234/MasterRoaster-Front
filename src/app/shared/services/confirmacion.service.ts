import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';

export interface ConfirmacionData {
  titulo: string;
  mensaje: string;
  textoConfirmar: string;
  textoCancelar: string;
  resolver: (respuesta: boolean) => void;
}

@Injectable({ providedIn: 'root' })
export class ConfirmacionService {
  private confirmacionSubject = new ReplaySubject<ConfirmacionData>(1);
  confirmacion$ = this.confirmacionSubject.asObservable();

  solicitarConfirmacion(data: Omit<ConfirmacionData, 'resolver'>): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.confirmacionSubject.next({
        ...data,
        resolver: resolve
      });
    });
  }
}
