import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lote } from '../../../../interfaces/lote.interface';
import { LoteService } from '../../service/lote.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-editar-lote',
  standalone: true,
  imports: [FormsModule, NgFor,NgSelectModule],
  templateUrl: './editar-lote.component.html',
  styles: [],
})
export class EditarLoteComponent implements OnInit {

  constructor(
    private readonly loteService: LoteService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
     if (this.id) {
      this.loteService.getLoteById(this.id).subscribe({
        next: (response) => {
          this.nuevoLote = response;
        },
        error: (error) => console.error('Error al obtener el lote:', error)
      });
     }
     this.cargarDatos();
  }

  @Input()  id: string = '';
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onCreate = new EventEmitter<any>();

  procesos = [
    'Lavado',
    'Natural',
    'Honey',
    'Experimental',
  ]

  nuevoLote: Lote = {
    id_user: '',
    productor: '',
    finca: '',
    region: '',
    departamento: '',
    peso: 0,
    variedades: [],
    proceso: '',
  };

  Usuarios: {
    id_user: string;
    nombre: string;
  }[] = [];
  
  variedadesArabica: string[] = [
    'Typica', 'Bourbon', 'Caturra', 'Catuai', 'Pacamara',
    'SL28', 'SL34', 'Geisha', 'Mundo Novo', 'Maragogipe',
    'Villalobos', 'Pacas', 'Ruiru 11', 'Catimor', 'Villa Sarchi'
  ];

  private cargarDatos() {
    this.authService.getUsers().subscribe({
      next:(res)=>{
        this.Usuarios = res.map((user:any) => ({
          id_user: user.id_user,
          nombre: user.name,
        }));
      }
    });
  }


  submit() {
    this.loteService.updateLote(this.id, this.nuevoLote).subscribe({
      next: (response) => {
        this.onCreate.emit();
        this.cerrar();
      },
      error: (error) => console.error('Error al actualizar el lote:', error)
    });
  }

  cerrar() {
    this.onCerrar.emit();
  }


}
