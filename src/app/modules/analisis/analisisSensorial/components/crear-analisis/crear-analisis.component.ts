import { NgIf, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalisisSensorialService } from '../../service/analisis-sensorial.service';
import { AnalisisSensorial } from '../../../../../interfaces/analisisSensorial.interface';

@Component({
  selector: 'app-crear-analisis-sensorial',
  standalone: true,
  templateUrl: './crear-analisis.component.html',
  imports: [ FormsModule]
})
export class CrearAnalisisSensorialComponent  {
  
  constructor(
    private readonly analisisSensorialService: AnalisisSensorialService
  ) {}

  @Input() set analisis(value: AnalisisSensorial) {
  if (value) {
    this.nuevoAnalisis = { ...value };
    this.calcularPuntajeTaza(); // si aplica
  }
}

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  nuevoAnalisis:AnalisisSensorial = {
    fragancia_aroma: 6,
    sabor: 6,
    sabor_residual: 6,
    acidez: 6,
    cuerpo: 6,
    uniformidad: 6,
    balance: 10,
    taza_limpia: 10,
    dulzor: 10,
    puntaje_catador: 6,
    taza_defecto_ligero: 0,
    tazas_defecto_rechazo: 0,
    puntaje_taza: 0,
    comentario: '',
    id_analisis_sensorial: '',
    fecha_registro: new Date(),
  };

  guardar() {
    this.analisisSensorialService.createAnalisisSensorial(this.nuevoAnalisis).subscribe({
      next:(res)=>{
        this.onAnalisisCreado.emit();
        this.cerrar();
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }

  private normalizar(valor: number): number {
    return Math.min(10, Math.max(6, valor || 0));
  }
  
  calcularPuntajeTaza() {
    const n = this.nuevoAnalisis;
    const suma =
      this.normalizar(n.fragancia_aroma) +
      this.normalizar(n.sabor) +
      this.normalizar(n.sabor_residual) +
      this.normalizar(n.acidez) +
      this.normalizar(n.cuerpo) +
      this.normalizar(n.uniformidad) +
      this.normalizar(n.balance) +
      this.normalizar(n.taza_limpia) +
      this.normalizar(n.dulzor) +
      this.normalizar(n.puntaje_catador);
  
      n.puntaje_taza = suma;
  }

  cerrar() {
    this.onCerrar.emit();
  }
}
