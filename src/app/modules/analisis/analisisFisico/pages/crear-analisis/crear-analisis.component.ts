import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-analisis',
  imports: [ NgFor, FormsModule],
  templateUrl: './crear-analisis.component.html',
  styles: ''
})
export class CrearAnalisisFisicoComponent {

  colores = ['Azul verde', 'Azulado Verde', 'Verde', 'Verdoso', 'Amarillo verde', 'Amarillo Pálido', 'Amarillento', 'Marrón'];
  olores = ['Olor Extrano', 'Olor a Humedad', 'limpio'];
  grados = ['Especial', 'Grado 1', 'Grado 2', 'Grado 3', 'Convencional'];

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  nuevoAnalisis = {
    peso_muestra: null,
    peso_pergamino: null,
    wa: null,
    temperatura_wa: null,
    humedad: null,
    temperatura_humedad: null,
    densidad: null,
    color_grano_verde: '',
    olor: '',
    superior_malla_18: null,
    superior_malla_16: null,
    superior_malla_14: null,
    menor_malla_16: null,
    peso_defectos: null,
    quaquers: null,
    peso_muestra_tostada: null,
    desarrollo: null,
    pocentaje_caramelizcacion: null,
    c_desarrollo: null,
    grado: '',
    comentario: '',
    defectos_primarios: [],
    defectos_secundarios: []
  };

  guardar() {
    this.onAnalisisCreado.emit();
    this.cerrar();
  }

  cerrar() {
    this.onCerrar.emit();
  }
}
