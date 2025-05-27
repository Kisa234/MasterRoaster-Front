import { AlertaService } from './../../../../shared/services/alerta.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoteService } from '../../service/lote.service';
import { MuestraService } from '../../../muestra/service/muestra.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Muestra } from '../../../../interfaces/muestra.interface';

@Component({
  selector: 'app-lote-muestra',
  imports: [NgFor, FormsModule],
  templateUrl: './lote-muestra.component.html',
  styles: ``
})
export class LoteMuestraComponent implements OnInit{

  constructor(
    private loteService : LoteService,
    private muestraService : MuestraService,
    private alertaService: AlertaService
  ) { }

  nuevoLote = {
    id_muestra: '',
    peso : 0,
  }
  muestras: string[] = [];

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onCreate = new EventEmitter<any>();

  ngOnInit(): void {
    this.muestraService.getMuestras().subscribe((muestras) => {
      this.muestras = muestras.map(muestra => muestra.id_muestra!);
    });
  }

  cerrar(){
    this.onCerrar.emit();
  }

  submit(){
    this.loteService.createLoteFromMuestra(this.nuevoLote.id_muestra, this.nuevoLote.peso).subscribe({  
        next: (response) => {
          this.alertaService.mostrar('success','Lote de una muestra creado exitosamente'); 
          this.onCreate.emit();
          this.cerrar();
        },
        error: (error) => {
          this.alertaService.mostrar('error', 'Error al crear el lote de la muestra');
        }
    });
  }

}
