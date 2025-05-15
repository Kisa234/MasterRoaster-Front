import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { FormsModule, NgModel } from '@angular/forms';
import { PedidoService } from '../../service/pedido.service';
import { CrearPedidoComponent } from "../../components/crear-pedido/crear-pedido.component";
import { NgIf } from '@angular/common';
import { EditarPedidoComponent } from "../../components/editar-pedido/editar-pedido.component";

@Component({
  selector: 'app-pedido',
  imports: [TableComponent, FormsModule, CrearPedidoComponent, NgIf, EditarPedidoComponent],
  templateUrl: './pedido.component.html',
  styles:""
})
export class PedidoComponent {

  constructor(
    private readonly pedidoService: PedidoService
  ){}

  ngOnInit() {
    this.getPedidos();
  }

  filtro: string = '';
  mostrarModal: boolean = false;
  mostrarModalPedido: boolean = false;
  pedidoIdActual: string = '';

  columns = [
    'lote',
    'tipo pedido',
    'cantidad (Gr)',
    'estado',
  ];

  rows: {
    id: string;
    lote: string;
    'tipo pedido': string;
    'cantidad (Gr)': number;
    estado: string;
  }[] = [];

  getPedidos(){
    this.pedidoService.getAllPedidos().subscribe({
      next: (response) => {
        this.rows = response.map((pedido) => ({
          id: pedido.id_pedido!,
          lote: pedido.id_lote!,
          'tipo pedido': pedido.tipo_pedido!,
          'cantidad (Gr)': pedido.cantidad!,
          estado: pedido.estado_pedido!,
        }));
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  deleteRow(row: any) {
    this.pedidoService.deletePedido(row.id).subscribe({
      next: (response) => {
        this.getPedidos();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  completeRow(row: any) {
    this.pedidoService.completarPedido(row.id).subscribe({
      next: (response) => {
        this.getPedidos();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  editRow(row: any) {
    this.pedidoIdActual = row.id;
    this.mostrarModalPedido = true;
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mostrarModalPedido = false;
  }

  actualizarPedidos() {
    this.cerrarModal();
    this.getPedidos();
  }
}
