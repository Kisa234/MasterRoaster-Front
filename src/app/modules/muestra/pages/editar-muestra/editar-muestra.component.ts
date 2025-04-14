import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MuestraService } from '../../service/muestra.service';
import { Muestra } from '../../../../interfaces/muestra.interface';

@Component({
  selector: 'app-editar-muestra',
  imports: [ FormsModule , NgFor],
  templateUrl: './editar-muestra.component.html',
  styles: ``
})
export class EditarMuestraComponent implements OnInit {
  constructor(
    private muestraService: MuestraService,
  ){}
  ngOnInit(): void {
    if(this.id) {
      this.muestraService.getMuestraById(this.id).subscribe({
        next: (res) => {
          this.nuevaMuestra = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  @Input()  id: string = '';
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
    this.muestraService.updateMuestra(this.id, this.nuevaMuestra).subscribe({
      next: (res) => {
        this.onAnalisisCreado.emit();
        this.cerrar();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  cerrar() {
    this.onCerrar.emit();
  }

}
