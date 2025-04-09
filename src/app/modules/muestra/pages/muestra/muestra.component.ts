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
    'Cliente',
    'Fecha de Registro',
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
