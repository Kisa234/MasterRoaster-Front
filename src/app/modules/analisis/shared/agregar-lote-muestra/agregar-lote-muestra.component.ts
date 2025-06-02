import { AlertaService } from './../../../../shared/services/alerta.service';
import { LoteService } from './../../../lote/service/lote.service';
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MuestraService } from '../../../muestra/service/muestra.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-lote-muestra',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './agregar-lote-muestra.component.html',
  styles: ``
})
export class AgregarLoteMuestraComponent implements OnInit{
  constructor(
    private readonly muestraService: MuestraService,
    private readonly loteService:LoteService,
    private readonly AlertaService: AlertaService,

  ){}
  
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<any>();


  muestras: string[] = [];
  lotes: string[] = [];
  tipoSeleccionado: string = 'Lote';
  idSeleccionado: string = '';

  cerrar(){
    this.onCerrar.emit();
  }

  submit() {
    if (!this.idSeleccionado) {
      this.AlertaService.mostrar('error',`Por favor, selecciona un ${this.tipoSeleccionado.toLowerCase()} antes de continuar.`);
      return;
    }

    this.onSubmit.emit({
      tipo: this.tipoSeleccionado,
      id: this.idSeleccionado
    });
    this.onCerrar.emit();
  }


  ngOnInit(): void {

    this.muestraService.getMuestras().subscribe((muestras) => {
      this.muestras = muestras.map(muestra => muestra.id_muestra!);
    });

    this.loteService.getLotes().subscribe((lotes) => {
      this.lotes = lotes.map(lote => lote.id_lote!);
    })


  }
}
