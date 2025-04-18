import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-lote-tostado',
  imports: [TableComponent, FormsModule],
  templateUrl: './lote-tostado.component.html',
  styles: ``
})
export class LoteTostadoComponent {
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
    'perfil tostado',
    'fecha registro'
  ];

  rows: {
    id: string;
    perfil_tostado: string;
    fecha_registro: string;
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
