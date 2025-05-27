import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MuestraService } from '../../service/muestra.service';
import { Muestra } from '../../../../interfaces/muestra.interface';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertaService } from '../../../../shared/services/alerta.service';

@Component({
  selector: 'app-editar-muestra',
  imports: [ FormsModule , NgFor,NgSelectModule],
  templateUrl: './editar-muestra.component.html',
  styles: ``
})
export class EditarMuestraComponent implements OnInit {
  constructor(
    private muestraService: MuestraService,
    private alertaService: AlertaService
    
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
    variedades: [],
    proceso: '',
  };

  variedadesArabica: string[] = [
    'Typica', 'Bourbon', 'Caturra', 'Catuai', 'Pacamara',
    'SL28', 'SL34', 'Geisha', 'Mundo Novo', 'Maragogipe',
    'Villalobos', 'Pacas', 'Ruiru 11', 'Catimor', 'Villa Sarchi'
  ];

  

  
  submit() {
    console.log(this.nuevaMuestra);
    this.muestraService.updateMuestra(this.id, this.nuevaMuestra).subscribe({
      next: (res) => {
        this.alertaService.mostrar('success', 'Muestra editada con éxito');
        this.onAnalisisCreado.emit();
        this.cerrar();
      },
      error: (err) => {
        this.alertaService.mostrar('error', `Error al editar la muestra`);
    }});
  }

  cerrar() {
    this.onCerrar.emit();
  }

}
