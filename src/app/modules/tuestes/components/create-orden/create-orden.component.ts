import { AlertaService } from './../../../../shared/services/alerta.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pedido } from '../../../../interfaces/pedido.interface';
import { PedidoService } from '../../../pedidos/service/pedido.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Tueste } from '../../../../interfaces/tueste.interface';
import { TuesteService } from '../../service/service.service';
import { LoteService } from '../../../lote/service/lote.service';
import { Lote } from '../../../../interfaces/lote.interface';
import { CommonModule, NgFor, NgSwitch, NgSwitchDefault } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../interfaces/user.interface';
import { TableComponent } from "../../../../shared/components/table/table.component";

interface TuesteRow {
  [key: string]: number;
  '# Batch': number;
  'Peso Verde': number;
  'Peso Tostado': number;
}

@Component({
  selector: 'app-create-orden',
  imports: [NgFor, FormsModule, NgSwitch,NgSwitchDefault, CommonModule],
  templateUrl: './create-orden.component.html',
  styles: ``
})
export class CreateOrdenComponent implements OnInit {

  constructor(
      private readonly pedidoService: PedidoService,
      private readonly authService: AuthService,
      private readonly loteService: LoteService,
      private readonly alertaService: AlertaService,
      
  ) {}

  ngOnInit() {
      this.cargarUsuarios();
  }

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();
  cafeTostado: number = 0;
  pesoVerdeLote: number = 0;
  pesoTostadoLote: number = 0;

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
  ]

  
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
  

  private actualizando = false;

  getCantidadLote() {
    this.loteService.getLoteById(this.nuevopedido.id_lote!).subscribe({
      next: (res) => {
        this.pesoVerdeLote = res.peso;
        this.pesoTostadoLote = res.peso_tostado? res.peso_tostado : 0;
      },
      error: (err) => {
        this.alertaService.mostrar('error', 'Error al obtener peso del lote');
      }
    });
  }


  actualizarTostadoDesdeVerde(): void {
    if (this.actualizando) return;
    this.actualizando = true;
    this.cafeTostado = this.nuevopedido.cantidad 
      ? parseFloat((this.nuevopedido.cantidad / 1.15).toFixed(2)) 
      : 0;
    this.actualizando = false;
  }
  
  actualizarVerdeDesdeTostado(): void {
    if (this.actualizando) return;
    this.actualizando = true;
    this.nuevopedido.cantidad = this.cafeTostado 
      ? parseFloat((this.cafeTostado * 1.15).toFixed(2)) 
      : 0;
    this.actualizando = false;
  }
  
  actualizarPesoTostado(index: number): void {
    const verde = this.data[index]['Peso Verde'];
    this.data[index]['Peso Tostado'] = parseFloat((verde / 1.15).toFixed(2));
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
      this.alertaService.mostrar('error', 'Los pesos verde y tostado deben ser mayores a 0');
      return;
    }

    //validar que el peso verde y el peso tostado sean iguales a la cantidad del pedido
    const totalPesoVerde = this.totalPesoVerde;
    const totalPesoTostado = this.totalPesoTostado;
    
    if (totalPesoVerde !== this.nuevopedido.cantidad) {
      this.alertaService.mostrar('error', 'El peso verde debe ser igual a la cantidad del pedido');
      return;
    }

    if (totalPesoTostado !== this.cafeTostado) {
      this.alertaService.mostrar('error', 'El peso tostado debe ser igual al café tostado calculado');
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


    this.pedidoService.createPedido(this.nuevopedido).subscribe({
      next:(res)=>{
        this.onAnalisisCreado.emit();
        this.cerrar();
        console.log(this.nuevopedido);
        this.alertaService.mostrar('success', 'Pedido creado exitosamente');
      },
      error:(err)=>{
        console.log(this.nuevopedido);
        this.alertaService.mostrar('error', 'Error al crear el pedido');
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
          .filter((lote: Lote) => 
            lote.id_user === this.nuevopedido.id_user )
          .map((lote: Lote) => ({
            id_lote: lote.id_lote as string, 
            
          }));
      }
    });
  }




  cerrar() {
    this.onCerrar.emit();
  }
}
