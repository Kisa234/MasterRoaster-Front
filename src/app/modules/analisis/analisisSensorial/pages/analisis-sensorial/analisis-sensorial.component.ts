import { Component, EventEmitter, Output } from '@angular/core';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { FormsModule } from '@angular/forms';
import { CrearAnalisisSensorialComponent } from "../crear-analisis/crear-analisis.component";
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-analisis-sensorial',
  imports: [NgIf, FormsModule, RouterModule, TableComponent,CrearAnalisisSensorialComponent],
  templateUrl: './analisis-sensorial.component.html',
})
export class AnalisisSensorialComponent {
  filtro: string = '';
  mostrarModal: boolean = false;

  columns = [
    'Id Lote',
    'Fecha Registro',
    'Puntaje',
    'Comentario'
  ];

  rows = [

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

