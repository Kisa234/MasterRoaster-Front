import { AlertaService } from './../../../../shared/services/alerta.service';
import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoteService } from '../../service/lote.service';
import { CrearLoteComponent } from '../../components/crear-lote/crear-lote.component';
import { EditarLoteComponent } from '../../components/editar-lote/editar-lote.component';
import { LoteMuestraComponent } from '../../components/lote-muestra/lote-muestra.component';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReporteAnalisisComponent } from "../../../analisis/shared/reporte-analisis/reporte-analisis.component";
import { AgregarAnalisisComponent } from "../../../analisis/shared/agregar-analisis/agregar-analisis.component";



@Component({
  selector: 'app-lote',
  imports: [
    NgIf, FormsModule, RouterModule, TableComponent,
    CrearLoteComponent, EditarLoteComponent, LoteMuestraComponent,
    ReporteAnalisisComponent, AgregarAnalisisComponent
  ],
  templateUrl: './lote.component.html',

})
export class LoteComponent implements OnInit {
  constructor(
    private readonly loteService: LoteService,
    private readonly alertaService:AlertaService
  ){}

  ngOnInit() {
    this.getLotes();
  }

  filtro: string = '';
  mostrarModal: boolean = false;
  mostrarModalLote: boolean = false;
  mostrarModalLoteMuestra: boolean = false;
  mostrarReporte: boolean=false ;
  mostrarCrearAnalisis: boolean = false;
  loteIdActual: string = '';

  columnsVerde = [
    'id',
    'peso (Gr)',
    'Cliente',
    'productor',
    'finca',
    'region',
    'departamento',
    'variedades'
  ];

  rowsVerde: {
    id: string;
    'peso (Gr)': string;
    Cliente: string;
    productor: string;
    finca: string;
    region: string;
    departamento: string;
    variedades: string[];
    id_analisis:string;
  }[] = [];

  columnsTostado = [
    'id',
    'Cliente',
    'peso verde (Gr)',
    'peso tostado (Gr)',
    'productor',
    'finca',
    'region',
    'departamento',
    'variedades'
  ];

  rowsTostado: {
    id: string;
    'Cliente': string;
    'peso verde (Gr)': string;
    'peso tostado (Gr)': string;
    productor: string;
    finca: string;
    region: string;
    departamento: string;
    variedades: string[];
    id_analisis :string;
  }[] = [];

  getLotes() {
  this.loteService.getLotesVerdes().subscribe({
    next: (response) => {
      const observables = response.map((lote) =>
        this.loteService.getUserByLoteId(lote.id_lote!).pipe(
          map((cliente:string) => ({
            id: lote.id_lote!,
            Cliente: cliente,
            productor: lote.productor,
            finca: lote.finca,
            region: lote.region,
            departamento: lote.departamento,
            'peso (Gr)': lote.peso.toLocaleString('en-US'),
            variedades: lote.variedades,
            id_analisis: lote.id_analisis? lote.id_analisis : ''
          }))
        )
      );

      forkJoin(observables).subscribe((results) => {
        this.rowsVerde = results;
      });
    },
    error: (error) => console.error('Error al obtener los lotes verdes:', error),
  });

  this.loteService.getLotesTostados().subscribe({
    next: (response) => {
      const observables = response.map((lote) =>
        this.loteService.getUserByLoteId(lote.id_lote!).pipe(
          map((cliente:string) => ({
            id: lote.id_lote!,
            Cliente: cliente,
            productor: lote.productor,
            finca: lote.finca,
            region: lote.region,
            departamento: lote.departamento,
            'peso verde (Gr)': lote.peso.toLocaleString('en-US'),
            'peso tostado (Gr)': lote.peso_tostado!.toLocaleString('en-US'),
            variedades: lote.variedades,
            id_analisis: lote.id_analisis? lote.id_analisis : ''
          }))
        )
      );

      forkJoin(observables).subscribe((results) => {
        this.rowsTostado = results;
      });
    },
    error: (error) => console.error('Error al obtener los lotes tostados:', error),
  });
}




  abrirModal() {
    this.mostrarModal = true;
  }

  abrirReporte(row: any) {
    if(row.id_analisis){
      this.loteIdActual = row.id;
      this.mostrarReporte = true;
    }else{
      this.alertaService.mostrar('error', "este lote no tiene un analisis asosciado")
      this.mostrarCrearAnalisis = true;
    }

  }

  abrirModalMuestra() {
    this.mostrarModalLoteMuestra = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mostrarModalLote = false;
    this.mostrarModalLoteMuestra = false;
    this.mostrarReporte = false;
    this.mostrarCrearAnalisis = false;

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
