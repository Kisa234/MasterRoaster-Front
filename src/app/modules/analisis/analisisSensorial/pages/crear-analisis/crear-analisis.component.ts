import { NgIf, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-analisis-sensorial',
  standalone: true,
  templateUrl: './crear-analisis.component.html',
  imports: [ FormsModule]
})
export class CrearAnalisisSensorialComponent {
  colores = ['Azul verde', 'Azulado Verde', 'Verde', 'Verdoso', 'Amarillo verde', 'Amarillo Pálido', 'Amarillento', 'Marrón'];
  olores = ['Olor Extrano', 'Olor a Humedad', 'limpio'];
  grados = ['Especial', 'Grado 1', 'Grado 2', 'Grado 3', 'Convencional'];

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  nuevoAnalisis = {
      fragancia_aroma: null,
      sabor: null,
      sabor_residual: null,
      acidez: null,
      cuerpo: null,
      uniformidad: null,
      balance: null,
      taza_limpia: null,
      dulzor: null,
      puntaje_catador: null,
      taza_defecto_ligero: null,
      tazas_defecto_rechazo: null,
      puntaje_taza: null,
      comentario: null,
  };

  guardar() {
    this.onAnalisisCreado.emit();
    this.cerrar();
  }

  cerrar() {
    this.onCerrar.emit();
  }
}
