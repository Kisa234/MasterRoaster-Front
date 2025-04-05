import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CrearAnalisisComponent } from '../crear-analisis/crear-analisis.component';



@Component({
  selector: 'app-analisis-fisico-rapido',
  imports: [CommonModule, TableComponent, RouterModule, FormsModule, CrearAnalisisComponent],
  standalone: true,
  templateUrl: './analisis-fisico-rapido.component.html',
  styles: ''
})
export class AnalisisFisicoRapidoComponent {
  columns = [
    'Id',
    'Fecha Registro',
    'Grado',
  ];

  rows = [

  ]



  mostrarModal = false;

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarAnalisis(analisis: any) {
    console.log('Análisis guardado:', analisis);
    this.cerrarModal();
  }
}
