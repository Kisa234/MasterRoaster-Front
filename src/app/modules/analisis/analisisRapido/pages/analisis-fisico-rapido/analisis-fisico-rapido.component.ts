import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CrearAnalisisComponent } from '../crear-analisis/crear-analisis.component';

interface Analisis {
  id: number;
  fecha: string;
  descripcion: string;
}

@Component({
  selector: 'app-analisis-fisico-rapido',
  imports: [CommonModule, TableComponent, RouterModule, FormsModule, CrearAnalisisComponent],
  standalone: true,
  templateUrl: './analisis-fisico-rapido.component.html',
  styles: ''
})
export class AnalisisFisicoRapidoComponent {
  columns = ['ID', 'Fecha', 'Descripción', 'Acciones'];

  analisis: Analisis[] = [
    { id: 1, fecha: '2025-03-27', descripcion: 'Muestra A' },
    { id: 2, fecha: '2025-03-28', descripcion: 'Muestra B' }
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
