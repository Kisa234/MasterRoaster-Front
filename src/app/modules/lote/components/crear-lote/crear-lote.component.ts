import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoteService } from '../../service/lote.service';
import { Lote } from '../../../../interfaces/lote.interface';
import { NgFor } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-crear-lote',
  imports: [FormsModule,NgFor,NgSelectModule],
  templateUrl: './crear-lote.component.html',
})
export class CrearLoteComponent implements OnInit {
  ngOnInit(): void {
    this.cargarDatos();
  }

  constructor(
    private readonly loteService: LoteService,
    private readonly authService: AuthService,
  ) {}

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onCreate = new EventEmitter<any>();

  procesos = [
    'Lavado',
    'Natural',
    'Honey',
    'Experimental',
  ]

  Usuarios: {
    id_user: string;
    nombre: string;
  }[] = [];

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
    console.log(this.nuevoLote);
    this.nuevoLote.peso = parseFloat(this.nuevoLote.peso.toString());
    this.loteService.createLote(this.nuevoLote).subscribe({
      next: (response) => {
        this.onCreate.emit();
        this.cerrar();
      },
      error: (error) => console.error('Error al crear el lote:', error)
    });
  }

  cerrar() {
    this.onCerrar.emit();
  }
}
