import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Lote } from '../../../../interfaces/lote.interface';
import { Muestra } from '../../../../interfaces/muestra.interface';
import { MuestraService } from '../../service/muestra.service';

@Component({
  selector: 'app-crearmuestra',
  imports: [FormsModule,NgFor],
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

  nuevaMuestra: Muestra = {
    productor: '',
    finca: '',
    region: '',
    departamento: '',
    peso: 0,
    variedades: '',
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
