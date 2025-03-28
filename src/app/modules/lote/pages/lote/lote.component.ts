import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CrearAnalisisComponent } from '../../../analisis/analisisRapido/pages/crear-analisis/crear-analisis.component';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrearLoteComponent } from '../crear-lote/crear-lote.component';

@Component({
  selector: 'app-lote',
  imports: [NgIf, FormsModule, RouterModule, TableComponent, CrearLoteComponent],
  templateUrl: './lote.component.html',

})
export class LoteComponent {
  filtro: string = '';
  mostrarModal: boolean = false;

  columns = [
    'ID',
    'Fecha',
    'Descripción',
    'Acciones'
  ];

  rows = [
    { id: 1, fecha: '2025-03-27', descripcion: 'Muestra A' },
    { id: 2, fecha: '2025-03-28', descripcion: 'Muestra B' }
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
