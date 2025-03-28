import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CrearAnalisisComponent } from "../crear-analisis/crear-analisis.component";


@Component({
  selector: 'app-analisis-fisico',
  standalone: true,
  templateUrl: './analisis-fisico.component.html',
  imports: [NgIf, FormsModule, RouterModule, TableComponent, CrearAnalisisComponent]
})
export class AnalisisFisicoComponent {
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
