import { Component } from '@angular/core';
import { CrearLoteComponent } from '../../../lote/pages/crear-lote/crear-lote.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-muestra',
  imports: [NgIf, FormsModule, RouterModule, TableComponent, CrearLoteComponent],
  templateUrl: './muestra.component.html',
  styles:""
})
export class MuestraComponent {
  filtro: string = '';
  mostrarModal: boolean = false;

  columns = [
    'Nombre',
    'Peso',
    'Usuario',
    'Analisis'
  ];

  rows = [
    {"nombre": "Muestra 1", "peso": "10kg", "usuario": "Usuario 1", "analisis": "Analisis 1"},
    {"nombre": "Muestra 2", "peso": "20kg", "usuario": "Usuario 2", "analisis": "Analisis 2"},
  ]



  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarAnalisis() {

    this.cerrarModal();
  }
}
