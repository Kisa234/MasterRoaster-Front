import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrearLoteComponent } from '../crear-lote/crear-lote.component';
import { LoteService } from '../../service/lote.service';
import { EditarLoteComponent } from "../editar-lote/editar-lote/editar-lote.component";


@Component({
  selector: 'app-lote',
  imports: [NgIf, FormsModule, RouterModule, TableComponent, CrearLoteComponent, EditarLoteComponent],
  templateUrl: './lote.component.html',

})
export class LoteComponent implements OnInit {

  constructor(
    private readonly loteService:LoteService,
  ){}

  filtro: string = '';
  mostrarModal: boolean = false;
  mostrarModalLote: boolean = false;
  loteIdActual: string = ''; 

  columns = [
    'id',
    'productor',
    'finca',
    'region',
    'departamento',
    'fecha_compra',
    'peso',
    'variedades'
  ];

  rows: {
    id: any;
    productor: string;
    finca: string;
    region: string;
    departamento: string;
    fecha_compra: Date;
    peso: number;
    variedades: string;
  }[] = [];


  getLotes(){
    this.loteService.getLotes().subscribe({
      next: (response) => {
        this.rows = response.map((lote) => ({
          id: lote.id_lote,
          productor: lote.productor,
          finca: lote.finca,
          region: lote.region,
          departamento: lote.departamento,
          fecha_compra: lote.fecha_compra,
          peso: lote.peso,
          variedades: lote.variedades,
        }));
      },
      error: (error) => console.error('Error al obtener los lotes:', error),
    });
  }

  ngOnInit() {
    this.getLotes();
  }


  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mostrarModalLote = false;
    
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
