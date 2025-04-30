import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoteService } from '../../service/lote.service';
import { CrearLoteComponent } from '../../components/crear-lote/crear-lote.component';
import { EditarLoteComponent } from '../../components/editar-lote/editar-lote.component';
import { LoteMuestraComponent } from '../../components/lote-muestra/lote-muestra.component';


@Component({
  selector: 'app-lote',
  imports: [NgIf, FormsModule, RouterModule, TableComponent, CrearLoteComponent, EditarLoteComponent, LoteMuestraComponent],
  templateUrl: './lote.component.html',

})
export class LoteComponent implements OnInit {
  constructor(
    private readonly loteService:LoteService,
  ){}

  ngOnInit() {
    this.getLotes();
  }

  filtro: string = '';
  mostrarModal: boolean = false;
  mostrarModalLote: boolean = false;
  mostrarModalLoteMuestra: boolean = false;
  loteIdActual: string = '';

  columns = [
    'id',
    'productor',
    'finca',
    'region',
    'departamento',
    'peso (Kg)',
    'variedades'
  ];

  rows: {
    id: string;
    productor: string;
    finca: string;
    region: string;
    departamento: string;
    'peso (Kg)': number;
    variedades: string[];
  }[] = [];


  getLotes(){
    this.loteService.getLotes().subscribe({
      next: (response) => {
        this.rows = response.map((lote) => ({
          id: lote.id_lote!,
          productor: lote.productor,
          finca: lote.finca,
          region: lote.region,
          departamento: lote.departamento,
          'peso (Kg)': lote.peso,
          variedades: lote.variedades,
        }));
      },
      error: (error) => console.error('Error al obtener los lotes:', error),
    });
  }



  abrirModal() {
    this.mostrarModal = true;
  }

  abrirModalMuestra() {
    this.mostrarModalLoteMuestra = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mostrarModalLote = false;
    this.mostrarModalLoteMuestra = false;

  }

  actualizarLotes() {
    this.cerrarModal();
    this.getLotes();
  }

  editRow(row: any) {
    this.loteIdActual = row.id;
    this.mostrarModalLote = true;
  }

  deleteRow(row: any) {
    this.loteService.deleteLote(row.id).subscribe({
      next: () => {
        this.getLotes();
      },
      error: (error) => console.error('Error al eliminar el lote:', error),
    });
  }
}
