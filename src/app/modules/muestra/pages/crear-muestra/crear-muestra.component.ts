import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Lote } from '../../../../interfaces/lote.interface';
import { Muestra } from '../../../../interfaces/muestra.interface';

@Component({
  selector: 'app-crearmuestra',
  imports: [FormsModule],
  templateUrl: './crear-muestra.component.html',
  styles:""
})
export class CrearmuestraComponent {


  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  procesos = [
    'Lavado',
    'Natural',
    'Honey',
    'Experimental',
  ]

  nuevaMuestra: Muestra = {
    nombre: '',
    peso: 0,
    fecha_registro: new Date(),
    user_id: '',
    analisis_id: ''
  };

  submit() {

  }

  cerrar() {
    this.onCerrar.emit();
  }

}
