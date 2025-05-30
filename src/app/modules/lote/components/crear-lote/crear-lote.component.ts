import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoteService } from '../../service/lote.service';
import { Lote } from '../../../../interfaces/lote.interface';
import { NgFor } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthService } from '../../../auth/services/auth.service';
import { AlertaService } from '../../../../shared/services/alerta.service';

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
    private alertaService: AlertaService
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
    tipo_lote: 'Lote Verde',
  };

  variedadesArabica: string[] = [  
    "Typica",
    "Bourbon",
    "Mundo Novo",
    "Maragogipe",
    "Caturra",
    "Villa Sarchí",
    "Pacas",
    "Catuaí",
    "Geisha (Gesha)",
    "Pacamara",
    "Sarchimor",
    "Catimor",
    "SL28",
    "SL34",
    "Castillo",
    "Cenicafé 1",
    "Tabi",
    "Híbridos F1",
    "Moka",
    "Jamaica Blue Mountain",
    "Kona",
    "Marshell",
    "Sidra",
    "Bourbon Amarillo",
    "Bourbon Rosado",
    "Bourbon Enano",
    "Caturra Amarillo",
    "Papayo",
    "Arara"
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
        this.alertaService.mostrar('success', 'Lote creado con éxito');
        this.onCreate.emit();
        this.cerrar();
      },
      error: (error) => {
        this.alertaService.mostrar('error', 'Error al crear el lote');
      }
    });
  }

  cerrar() {
    this.onCerrar.emit();
  }
}
