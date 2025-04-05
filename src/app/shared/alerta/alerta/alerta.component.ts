import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alerta',
  imports: [NgClass],
  templateUrl: './alerta.component.html',
  styles:''
})
export class AlertaComponent {
  @Input() tipo: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() mensaje: string = '';
  @Output() cerrar = new EventEmitter<void>();

  alerta = {
    mostrar: false,
    tipo: 'success' as 'success' | 'error' | 'info' | 'warning',
    mensaje: ''
  };

}
