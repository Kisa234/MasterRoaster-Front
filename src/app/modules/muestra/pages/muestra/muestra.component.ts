import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MuestraService } from '../../service/muestra.service';
import { CrearmuestraComponent } from '../../components/crear-muestra/crear-muestra.component';
import { EditarMuestraComponent } from '../../components/editar-muestra/editar-muestra.component';

@Component({
  selector: 'app-muestra',
  imports: [NgIf, FormsModule, RouterModule, TableComponent, CrearmuestraComponent, CrearmuestraComponent, EditarMuestraComponent],
  templateUrl: './muestra.component.html',
  styles:""
})
export class MuestraComponent implements OnInit{

  constructor(
    public readonly muestraService:MuestraService,
  ) { }

  ngOnInit(): void {
    this.getMuestras();
  }

  filtro: string = '';
  mostrarModal: boolean = false;
  mostrarModalMuestra: boolean = false;
  muestraIdActual: string = '';

  columns = [
    'id',
    'productor',
    'finca',
    'region',
    'departamento',
    'peso (Gr)',
    'variedades'
  ];

  rows: {
    id: any;
    productor: string;
    finca: string;
    region: string;
    departamento: string;
    'peso (Gr)': number;
    variedades: string;
  }[] = [];

  getMuestras() {
    this.muestraService.getMuestras().subscribe((res) => {
      this.rows = res.map((muestra) => {
        return {
          id: muestra.id_muestra,
          productor: muestra.productor,
          finca: muestra.finca,
          region: muestra.region,
          departamento: muestra.departamento,
          'peso (Gr)': muestra.peso,
          variedades: muestra.variedades,
        };
      });
    });
  }


  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mostrarModalMuestra = false;
  }

  actualizarMuestra() {
    this.cerrarModal();
    this.getMuestras();
  }

  editRow(row: any) {
    this.muestraIdActual = row.id;
    this.mostrarModalMuestra = true;
  }

  deleteRow(row: any) {
    this.muestraService.deleteMuestra(row.id).subscribe({
      next: () => {
        this.getMuestras();
      },
      error: (error) => console.error('Error al eliminar el lote:', error),
    });
  }


  guardarAnalisis() {

    this.cerrarModal();
  }
}
