import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { TuesteService } from '../../service/service.service';
import { Pedido } from '../../../../interfaces/pedido.interface';
import { PedidoService } from '../../../pedidos/service/pedido.service';

@Component({
  selector: 'app-tueste',
  imports: [ FormsModule, RouterModule, TableComponent],
  templateUrl: './tueste.component.html',
  styles: ``
})

export class TuesteComponent {


  constructor(
    private tuesteService: TuesteService,
    private pedidoService: PedidoService,
  ){}

  ngOnInit() {
    this.getTuestes();
  }

  filtro: string = '';
  mostrarModal: boolean = false;
  mostrarModalLote: boolean = false;
  mostrarModalLoteMuestra: boolean = false;
  loteIdActual: string = '';
  today = Date.now();

  columns = [

    'Id Lote',
    'Fecha Tueste',
    'Peso (Kg)',
    'Observaciones',
    'Completar',
  ];

  rows: {
    'Id Lote' : string,
    'Fecha Tueste' : string,
    'Peso (Kg)' : string,
    'Observaciones' : string,
    'Completar' : string,
  }[] = [];


  getTuestes(){

  }

  editRow(row: any) {
    this.loteIdActual = row.id;
    this.mostrarModalLote = true;
  }

  deleteRow(row: any) {

  }
}
