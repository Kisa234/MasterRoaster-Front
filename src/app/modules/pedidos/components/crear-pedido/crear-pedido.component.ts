import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pedido   } from '../../../../interfaces/pedido.interface';
import { PedidoService } from '../../service/pedido.service';
import { LoteService } from '../../../lote/service/lote.service';
import { AuthService } from '../../../auth/services/auth.service';
import { NgFor } from '@angular/common';
import { Lote } from '../../../../interfaces/lote.interface';



@Component({
  selector: 'app-crear-pedido',
  imports: [FormsModule,NgFor],
  templateUrl: './crear-pedido.component.html',
  styles:""
})
export class CrearPedidoComponent implements OnInit {

  ngOnInit(): void {
    this.cargarDatos();
  }

  constructor(
    private readonly pedidoService: PedidoService,
    private readonly AuthService: AuthService,
    private readonly LoteService: LoteService,
  ) {}


  // Variables para el formulario
  Usuarios: {
    id_user: string;
    nombre: string;
    rol: string; 
  }[] = [];

  Lotes: {
    id_lote: string;
  }[] = [];

  TipoPedido: string[] = [
    'Venta Verde',
    'Tostado Verde'
  ];

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();
  nuevopedido:Pedido = {
    tipo_pedido: '',
    cantidad: 0,
    estado_pedido: '',
    comentario: '',
    id_user: '',
    id_lote: '',
  };

  guardar() {
    this.pedidoService.createPedido(this.nuevopedido).subscribe({
      next:(res)=>{
        this.onAnalisisCreado.emit();
        this.cerrar();
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }

  // Cargar los usuarios y lotes al iniciar el componente
  cargarDatos() {
    this.AuthService.getUsers().subscribe({
      next: (usuarios) => {
        this.Usuarios = usuarios.map((user: any) => ({
          id_user: user.id_user,
          nombre: user.name,
          rol: user.rol 
        }));

        console.log(this.Usuarios);
  
        this.LoteService.getLotes().subscribe({
          next: (lotes: Lote[]) => {
            this.Lotes = lotes
              .filter((lote: Lote) => !lote.id_user && !!lote.id_lote) // aseguramos que tenga id_lote
              .map((lote: Lote) => ({
                id_lote: lote.id_lote as string, // forzamos que no sea undefined
              }));
          }
        });
        
      }
    });
  }
  

  cerrar() {
    this.onCerrar.emit();
  }
}
