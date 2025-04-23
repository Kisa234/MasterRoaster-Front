import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoteService } from '../../service/lote.service';
import { Lote } from '../../../../interfaces/lote.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-crear-lote',
  imports: [FormsModule,NgFor],
  templateUrl: './crear-lote.component.html',
})
export class CrearLoteComponent {

  constructor(private readonly loteService: LoteService) {}

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onCreate = new EventEmitter<any>();

  procesos = [
    'Lavado',
    'Natural',
    'Honey',
    'Experimental',
  ]

  nuevoLote: Lote = {
    productor: '',
    finca: '',
    region: '',
    departamento: '',
    peso: 0,
    variedades: '',
    proceso: '',
  };

  submit() {
    console.log(this.nuevoLote);
    this.nuevoLote.peso = Number(this.nuevoLote.peso);
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
