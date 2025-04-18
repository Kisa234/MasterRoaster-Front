import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalisisSensorialService } from '../../service/analisis-sensorial.service';
import { analisisSensorial } from '../../../../../interfaces/analisisSensorial.interface';

@Component({
  selector: 'app-editar-analisis-sensorial',
  imports: [FormsModule],
  templateUrl: './editar-analisis-sensorial.component.html',
  styles: ``
})
export class EditarAnalisisSensorialComponent implements OnInit {

  constructor (
    private analisisService: AnalisisSensorialService
  ) { }



  ngOnInit(): void {
    this.analisisService.getAnalisisSensorialById(this.id).subscribe( {
      next: (response) => {
        if (response) {
          this.nuevoAnalisis = response;
        }
      }
    });
    this.calcularPuntajeTaza();
  }

  @Input() id:string = '';
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  nuevoAnalisis:analisisSensorial = {
    id_analisis_sensorial: this.id,
    fragancia_aroma: 0,
    sabor: 0,
    sabor_residual: 0,
    acidez: 0,
    cuerpo: 0,
    uniformidad: 0,
    balance: 0,
    taza_limpia: 0,
    dulzor: 0,
    puntaje_catador: 0,
    taza_defecto_ligero: 0,
    tazas_defecto_rechazo: 0,
    puntaje_taza: 0,
    comentario: '',
    fecha_registro: new Date(),
  };

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

  guardar() {
    this.analisisService.updateAnalisisSensorial(this.id, this.nuevoAnalisis).subscribe();
    this.onAnalisisCreado.emit();
    this.cerrar();
  }

  cerrar() {
    this.onCerrar.emit();
  }
}
