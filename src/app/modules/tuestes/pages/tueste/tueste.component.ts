import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tueste',
  imports: [ FormsModule, RouterModule, TableComponent],
  templateUrl: './tueste.component.html',
  styles: ``
})

export class TuesteComponent {


  constructor(
  ){}

  ngOnInit() {
    this.getLotes();
  }

  filtro: string = '';
  mostrarModal: boolean = false;
  mostrarModalLote: boolean = false;
  mostrarModalLoteMuestra: boolean = false;
  loteIdActual: string = '';
  today = Date.now();

  columns = [
    'id',
    'productor',
    'finca',
    'region',
    'departamento',
    'peso',
    'variedades'
  ];

  rows: {
    id: string;
    productor: string;
    finca: string;
    region: string;
    departamento: string;
    peso: number;
    variedades: string;
  }[] = [];


  getLotes(){

  }





  editRow(row: any) {
    this.loteIdActual = row.id;
    this.mostrarModalLote = true;
  }

  deleteRow(row: any) {

  }
}
