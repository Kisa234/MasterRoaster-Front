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
  ];

  rows: {
    'Id Lote' : string,
    'Fecha Tueste' : string,
    'Peso (Kg)' : string,
    'Observaciones' : string,
  }[] = [];



  html: string =
    `
    <button
            class="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded"
            (click)="onDelete(row)">
            Eliminar
    </button>
    `
    ;


  getTuestes(){
    this.tuesteService.getAllTuestes().subscribe({
      next: (response) => {
        this.rows = response.map((tueste) => ({
          'Id Lote': tueste.id_lote,
          'Fecha Tueste': tueste.fecha_tueste,
          'Peso (Kg)': tueste.peso,
          'Observaciones': tueste.observaciones,

        }));
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  editRow(row: any) {
    this.loteIdActual = row.id;
    this.mostrarModalLote = true;
  }

  deleteRow(row: any) {

  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    // this.mostrarModalMuestra = false;
  }

  actualizarMuestra() {
    this.cerrarModal();
    this.getTuestes();
  }
}
