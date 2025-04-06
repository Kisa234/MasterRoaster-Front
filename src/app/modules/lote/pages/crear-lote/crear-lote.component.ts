import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoteService } from '../../service/lote.service';
import { Lote } from '../../../../interfaces/lote.interface';

@Component({
  selector: 'app-crear-lote',
  imports: [FormsModule],
  templateUrl: './crear-lote.component.html',
})
export class CrearLoteComponent {

  constructor(private readonly loteService: LoteService) {}

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  nuevoLote: Lote = {
    productor: '',
    finca: '',
    region: '',
    departamento: '',
    fecha_compra: new Date(), 
    peso: 0,
    variedades: '',

  };

  submit() {
    this.nuevoLote.peso = Number(this.nuevoLote.peso);
    this.loteService.createLote(this.nuevoLote).subscribe({
      next: (response) => {
        console.log('Lote creado:', response);
        this.onAnalisisCreado.emit();
        this.cerrar();
      },
      error: (error) => console.error('Error al crear el lote:', error)
    });
  }

  cerrar() {
    this.onCerrar.emit();
  }
}
