import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Lote } from '../../../../interfaces/lote.interface';
import { Muestra } from '../../../../interfaces/muestra.interface';
import { MuestraService } from '../../service/muestra.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-crearmuestra',
  imports: [FormsModule,NgFor,NgSelectModule],
  templateUrl: './crear-muestra.component.html',
  styles:""
})
export class CrearmuestraComponent {

  constructor(
    private muestraService: MuestraService,
  ){}

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  procesos = [
    'Lavado',
    'Natural',
    'Honey',
    'Experimental',
  ]

  variedadesArabica: string[] = [
    'Typica', 'Bourbon', 'Caturra', 'Catuai', 'Pacamara',
    'SL28', 'SL34', 'Geisha', 'Mundo Novo', 'Maragogipe',
    'Villalobos', 'Pacas', 'Ruiru 11', 'Catimor', 'Villa Sarchi'
  ];

  

  nuevaMuestra: Muestra = {
    productor: '',
    finca: '',
    region: '',
    departamento: '',
    peso: 0,
    variedades: [],
    proceso: '',
  };

  
  submit() {
    console.log(this.nuevaMuestra);
    this.muestraService.createMuestra(this.nuevaMuestra).subscribe({
      next: (res) => {
        console.log(res);
        this.onAnalisisCreado.emit(res); 
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
