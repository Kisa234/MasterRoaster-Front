import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { FormsModule, NgModel } from '@angular/forms';
import { PedidoService } from '../../service/pedido.service';

@Component({
  selector: 'app-pedido',
  imports: [TableComponent, FormsModule],
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
  mostrarModalLote: boolean = false;
  mostrarModalLoteMuestra: boolean = false;
  loteIdActual: string = '';
  today = Date.now();

  columns = [
    'id',
    'tipo pedido',
    'cantidad (KG)',
    'estado',
    'lote',
  ];

  rows: {
    id: string;
    'tipo pedido': string;
    'cantidad (kg)': number;
    estado: string;
    lote: string;
  }[] = [];

  getPedidos(){
    this.pedidoService.getAllPedidos().subscribe({
      next: (response) => {
        this.rows = response.map((pedido) => ({
          id: pedido.id_pedido!,
          'tipo pedido': pedido.tipo_pedido,
          'cantidad (kg)': pedido.cantidad,
          estado: pedido.estado_pedido,
          lote: pedido.id_lote
        }));
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  editRow(row: any) {
    this.loteIdActual = row.id;
    this.mostrarModalLote = true;
  }

  deleteRow(row: any) {

  }
}
