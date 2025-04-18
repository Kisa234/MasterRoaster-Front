import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lote } from '../../../../interfaces/lote.interface';
import { LoteService } from '../../service/lote.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-editar-lote',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './editar-lote.component.html',
  styles: [],
})
export class EditarLoteComponent implements OnInit {

  constructor(private readonly loteService: LoteService) {}

  ngOnInit(): void {
     if (this.id) {
      this.loteService.getLoteById(this.id).subscribe({
        next: (response) => {
          this.nuevoLote = response;
        },
        error: (error) => console.error('Error al obtener el lote:', error)
      });
     }
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
    productor: '',
    finca: '',
    region: '',
    departamento: '',
    peso: 0,
    variedades: '',
    proceso: '',
  };

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
