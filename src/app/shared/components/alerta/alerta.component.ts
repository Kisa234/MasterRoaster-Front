import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './alerta.component.html',
})
export class AlertaComponent {
  @Input() tipo: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() mensaje: string = '';
  @Input() mostrar: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
}
