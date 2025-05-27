import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pedido, updatePedido   } from '../../../../interfaces/pedido.interface';
import { PedidoService } from '../../service/pedido.service';
import { LoteService } from '../../../lote/service/lote.service';
import { AuthService } from '../../../auth/services/auth.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-editar-pedido',
  imports: [FormsModule, NgFor],
  templateUrl: './editar-pedido.component.html',
  styles: ``
})
export class EditarPedidoComponent implements OnInit {

  ngOnInit(): void {
    console.log(this.id_pedido)
    if (this.id_pedido) {
      this.cargarDatos();
      this.cargarPedido();
    }
    console.log(this.pedido)
  }

  constructor(
    private readonly pedidoService: PedidoService,
    private readonly authService: AuthService,
    private readonly LoteService: LoteService,
  ) {}

  @Input() id_pedido: string = '';
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  pedido:Pedido = {
    id_pedido: '',
    tipo_pedido: '',
    cantidad: 0,
    id_lote: '',
    comentario: '',
  };

  

  cantidadLote: number = 0;



  // Variables para el formulario
  Usuarios: {
    id_user: string;
    nombre: string;
  }[] = [];
  Lotes: {
    id_lote: string;
  }[] = [];
  TipoPedido: string[] = [
    'Venta Verde',
    'Tostado Verde'
  ];

  getCantidadLote() {
    this.LoteService.getLoteById(this.pedido.id_lote!).subscribe({
      next: (res) => {
        this.cantidadLote = res.peso;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private cargarPedido(): void {
    this.pedidoService.getPedidoById(this.id_pedido).subscribe({
      next: (res) => {
        this.pedido.id_pedido = res.id_pedido;
        this.pedido.tipo_pedido = res.tipo_pedido;
        this.pedido.cantidad = res.cantidad;
        this.pedido.id_lote = res.id_lote;
        this.pedido.comentario = res.comentario;
        this.pedido.id_user = res.id_user;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private cargarDatos() {
    this.authService.getUsers().subscribe({
      next:(res)=>{
        this.Usuarios = res.map((user:any) => ({
          id_user: user.id_user,
          nombre: user.name,
        }));
      }
    });

    this.LoteService.getLotes().subscribe({
      next:(res)=>{
        this.Lotes = res.map((lote:any) => ({
          id_lote: lote.id_lote,
        }));
      }
    });
  }



  guardar() {
    
    const update: updatePedido = {
      id_pedido: this.pedido.id_pedido!,
      cantidad: this.pedido.cantidad!,
      comentario: this.pedido.comentario!,
    };

    this.pedidoService.updatePedido(this.id_pedido, update).subscribe({
      next: (res) => {
        this.onAnalisisCreado.emit();
        this.cerrar();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  cerrar() {
    this.onCerrar.emit();
  }
}
