import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { LoteService } from '../../../lote/service/lote.service';
import { TuesteService } from '../../service/service.service';
import { AuthService } from '../../../auth/services/auth.service';
import { PedidoService } from '../../../pedidos/service/pedido.service';
import { Lote } from '../../../../interfaces/lote.interface';
import { CommonModule, NgFor, NgSwitch, NgSwitchDefault } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../../../interfaces/pedido.interface';

interface TuesteRow {
  [key: string]: number;
  '# Batch': number;
  'Peso Verde': number;
  'Peso Tostado': number;
}

@Component({
  selector: 'app-edit-orden',
  imports: [NgFor, FormsModule, NgSwitch,NgSwitchDefault, CommonModule],
  templateUrl: './edit-orden.component.html',
  styles: ``
})
export class EditOrdenComponent {
    constructor(
      private readonly pedidoService: PedidoService,
      private readonly authService: AuthService,
      private readonly tuesteService: TuesteService,
      private readonly loteService: LoteService,
      
  ) {}
  
  ngOnInit() {
      this.cargarUsuarios();
      this.cargarLotes();
      this.cargarOrden();

  }
  
  @Input() id: string = '';
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();
    
  Usuarios: {
    id_user: string;
    nombre: string;
  }[] = [];
  
  Tostadoras: string[] = [
    'Kaleido',
    'Candela',
  ];
  
  Lotes: {
    id_lote: string;
  }[] = [];
  
  TipoPedido: string[] = [
    'Orden de Tueste',
  ];
  
  TipoTueste: string[] = [
    'Tueste Claro',
    'Tueste Medio Claro',
    'Tueste Medio',
    'Tueste Medio Oscuro',
    'Tueste Oscuro',
  ];
  
  nuevopedido:Pedido = {
    tipo_pedido: 'Orden Tueste',
    cantidad: 0,
    comentario: '',
    id_user: '',
    id_lote: '',
    pesos:    [],
    tostadora: '',
    fecha_tueste: new Date(),
  };
  
  data: TuesteRow[] = [
    {
      '# Batch': 1,
      'Peso Verde': 0,
      'Peso Tostado': 0,
    },
  ];
  
  columns: (keyof TuesteRow)[] = [
    '# Batch',
    'Peso Verde',
    'Peso Tostado',
  ];
  
  cantidadTostada(): number {
    return this.nuevopedido?.cantidad 
      ? parseFloat((this.nuevopedido.cantidad * 1.15).toFixed(2)) 
      : 0;
  }
  
  actualizarPesoTostado(index: number): void {
    const verde = this.data[index]['Peso Verde'];
    this.data[index]['Peso Tostado'] = parseFloat((verde * 1.15).toFixed(2));
  }
  
  get totalPesoVerde(): number {
    return this.data.reduce((sum, row) => sum + (row['Peso Verde'] || 0), 0);
  }
  
  get totalPesoTostado(): number {
    return this.data.reduce((sum, row) => sum + (row['Peso Tostado'] || 0), 0);
  }
  
  onDelete(row:any){
    // Eliminar el batch específico
    this.data = this.data.filter(r => r !== row);
  
    // Reasignar números de batch secuencialmente
    this.data = this.data.map((item, index) => ({
      ...item,
      '# Batch': index + 1
    }));
  }
  
  onAdd(){
    this.data.push({
      '# Batch': this.data.length + 1,
      'Peso Verde': 0,
      'Peso Tostado': 0, // Ejemplo de cálculo
    });
  }
  
  
  
  guardar() {
  
    //validar que el peso verde y tostado no sean 0
    const pesoVerde = this.data.map((row) => row['Peso Verde']);
    const pesoTostado = this.data.map((row) => row['Peso Tostado']);
    
    if (pesoVerde.some((peso) => peso <= 0) || pesoTostado.some((peso) => peso <= 0)) {
      alert('El peso verde y tostado deben ser mayores a 0');
      return;
    }
  
    //validar que el peso verde y el peso tostado sean iguales a la cantidad del pedido
    const totalPesoVerde = this.totalPesoVerde;
    const totalPesoTostado = this.totalPesoTostado;
    
    if (totalPesoVerde !== this.nuevopedido.cantidad) {
      alert('El peso verde debe ser igual a la cantidad del pedido');
      return;
    }
  
    if (totalPesoTostado !== this.cantidadTostada()) {
      alert('El peso tostado debe ser igual a la cantidad tostada del pedido');
      return;
    }
  
    //actualizar el pedido con los pesos
    this.nuevopedido.pesos = [];
    for (let i = 0; i < this.data.length; i++) {
      const pesoVerde = this.data[i]?.['Peso Verde'];
      if (pesoVerde !== undefined) {
        this.nuevopedido.pesos!.push(pesoVerde);
      }
    }
  
    console.log(this.nuevopedido);
  
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
  
  // Cargar los usuarios
  cargarUsuarios() {
    this.authService.getUsers().subscribe({
      next: (usuarios) => {
        this.Usuarios = usuarios.map((user: any) => ({
          id_user: user.id_user,
          nombre: user.name,
          rol: user.rol 
        }));
      
        console.log(this.Usuarios);
      }
    });
  }
  
  
  // Cargar los lotes
  cargarLotes() {
    this.loteService.getLotes().subscribe({
      next: (lotes: Lote[]) => {
        this.Lotes = lotes
          .map((lote: Lote) => ({
            id_lote: lote.id_lote as string, 
            
          }));
      }
    });
  }

  cargarOrden(){
    this.pedidoService.getPedidoById(this.id).subscribe({
      next: (pedido) => {
        console.log(pedido);
        this.nuevopedido = {

          cantidad: pedido.cantidad,
          comentario: pedido.comentario,
          id_user: pedido.id_user,
          id_lote: pedido.id_lote,
          pesos:   pedido.pesos,
          tostadora: pedido.tostadora,
          fecha_tueste: pedido.fecha_tueste,

        }
        this.nuevopedido.cantidad = this.totalPesoVerde;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }



  cerrar() {
    this.onCerrar.emit();
  }
}
