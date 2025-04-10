import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalisisFisicoService } from '../../service/analisis-fisico.service';
import { AnalisisFisico } from '../../../../../interfaces/analisisFisico.interface';

@Component({
  selector: 'app-editar-analisis-fisico',
  imports: [ NgFor, FormsModule],
  templateUrl: './editar-analisis-fisico.component.html',
  styles: ``
})
export class EditarAnalisisFisicoComponent implements OnInit {

  constructor(
    private readonly analisisFisicoService: AnalisisFisicoService,
  ) {}

  ngOnInit(): void {
    if(this.id){
      console.log(this.id);
      this.analisisFisicoService.getAnalisisById(this.id).subscribe({
        next: (response) => {
          this.nuevoAnalisis = response;
        },
        error: (error) => console.error('Error al obtener el analisis:', error)
      });
    }
  }

  @Input() id: string = "";
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  colores = ['Azul verde', 'Azulado Verde', 'Verde', 'Verdoso', 'Amarillo verde', 'Amarillo Pálido', 'Amarillento', 'Marrón'];
  olores = ['Olor Extrano', 'Olor a Humedad', 'limpio'];
  grados = ['Especial', 'Grado 1', 'Grado 2', 'Grado 3', 'Convencional'];


  nuevoAnalisis: AnalisisFisico = {
    peso_muestra: 0,
    peso_pergamino: 0,
    wa: 0,
    temperatura_wa: 0,
    humedad: 0,
    temperatura_humedad: 0,
    densidad: 0,
    color_grano_verde: '',
    olor: '',
    superior_malla_18: 0,
    superior_malla_16: 0,
    superior_malla_14: 0,
    menor_malla_16: 0,
    peso_defectos: 0,
    quaquers: 0,
    peso_muestra_tostada: 0,
    desarrollo: 0,
    pocentaje_caramelizcacion: 0,
    c_desarrollo: 0,
    grado: '',
    comentario: '',
    defectos_primarios: [],
    defectos_secundarios: [],
    id_analisis_fisico: '',
    fecha_registro: new Date()
  };



  guardar() {
    this.onAnalisisCreado.emit();
    this.cerrar();
  }

  cerrar() {
    this.onCerrar.emit();
  }
}
