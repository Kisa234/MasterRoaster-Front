import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-lote',
  imports: [FormsModule],
  templateUrl: './crear-lote.component.html',

})
export class CrearLoteComponent {
  colores = ['Azul verde', 'Azulado Verde', 'Verde', 'Verdoso', 'Amarillo verde', 'Amarillo Pálido', 'Amarillento', 'Marrón'];
  olores = ['Olor Extrano', 'Olor a Humedad', 'limpio'];
  grados = ['Especial', 'Grado 1', 'Grado 2', 'Grado 3', 'Convencional'];

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  nuevoAnalisis = {
    productor             : null,
    finca                 : null,
    region                : null,
    departamento          : null,
    fecha_compra          : null,
    peso                  : null,
    estado                : null,
    variedades            : null,
  };

  guardar() {
    this.onAnalisisCreado.emit();
    this.cerrar();
  }

  cerrar() {
    this.onCerrar.emit();
  }
}
