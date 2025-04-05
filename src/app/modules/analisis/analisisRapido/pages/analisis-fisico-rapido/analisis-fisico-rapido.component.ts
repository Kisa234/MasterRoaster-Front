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

  analisis: = [
    {"id":1, "Fecha Registro":"2025-03-27", "Grado":"Muestra A"},
  ];

  filtro: string = '';
  analisisFiltrados: Analisis[] = [...this.analisis];


  filtrarAnalisis() {
    const term = this.filtro.toLowerCase();
    this.analisisFiltrados = this.analisis.filter(a =>
      a.descripcion.toLowerCase().includes(term) || a.fecha.includes(term)
    );
  }


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
