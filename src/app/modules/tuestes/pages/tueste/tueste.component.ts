import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { TuesteService } from '../../service/service.service';
import { Pedido } from '../../../../interfaces/pedido.interface';
import { PedidoService } from '../../../pedidos/service/pedido.service';
import { CreateOrdenComponent } from "../../components/create-orden/create-orden.component";
import { NgIf } from '@angular/common';
import { EditOrdenComponent } from "../../components/edit-orden/edit-orden.component";

@Component({
  selector: 'app-tueste',
  imports: [FormsModule, RouterModule, TableComponent, CreateOrdenComponent, NgIf, EditOrdenComponent],
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
    this.getPedidos();
  }

  today = Date.now();
  filtro: string = '';
  pedidoIdActual: string = '';
  ComponentCompleteTueste: boolean = false;
  ComponentEditTueste: boolean = false;
  ComponentCreateOrder: boolean = false;
  ComponentEditOrder: boolean = false;
  
  columnsPedido = [
    'lote',
    'tipo pedido',
    'cantidad (KG)',
    'estado',
  ];

  rowsPedido: {
    id: string;
    lote: string;
    'tipo pedido': string;
    'cantidad (KG)': number;
    estado: string;
  }[] = [];

  columnsTueste = [
    'Id Lote',
    'Fecha Tueste',
    'Peso (Kg)',
    'Observaciones',
  ];

  rowsTueste: {
    'id' : string,
    'Id Lote' : string,
    'Fecha Tueste' : string,
    'Peso (Kg)' : string,
    'Observaciones' : string,
  }[] = [];

  getPedidos(){
    this.pedidoService.getPedidosOrdenTueste().subscribe({
      next: (response) => {
        console.log(response);
        this.rowsPedido = response.map((pedido) => ({
          id: pedido.id_pedido!,
          lote: pedido.id_lote!,
          'tipo pedido': pedido.tipo_pedido!,
          'cantidad (KG)': pedido.cantidad!,
          estado: pedido.estado_pedido!,
        }));
      },
      error: (error) => {
        console.error(error);
      }
    });
  }



  getTuestes(){
    this.tuesteService.getAllTuestes().subscribe({
      next: (response) => {
        this.rowsTueste = response.map((tueste) => ({
          id: tueste.id_tueste,
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
    this.pedidoIdActual = row.id;
    this.ComponentEditOrder = true;
    
  }

  completeRowTueste(row: any) {
    this.tuesteService.completarTostado(row.id).subscribe({
      next: (response) => {
        this.getTuestes();
      },
      error: (error) => {

      }
    });
  }

  abrirModalCreateOrder() {
    this.ComponentCreateOrder = true;
  }

  cerrarModal() {
    this.ComponentCreateOrder = false;
    this.ComponentCompleteTueste = false;
    this.ComponentEditTueste = false;
    this.ComponentEditOrder = false;
  }

  actualizarPedidos() {
    this.getPedidos();
    this.getTuestes();
    this.cerrarModal();
  }
}
