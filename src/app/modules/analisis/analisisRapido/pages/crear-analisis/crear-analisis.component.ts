import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalisisRapido } from '../../../../../interfaces/analisisRapido.interface';
import { AnalisisRapidoService } from '../../service/analisis-rapido.service';

@Component({
  selector: 'app-form-analisis-rapido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './crear-analisis.component.html',
})
export class CrearAnalisisComponent {

  constructor(
      private readonly analisisRapidoService: AnalisisRapidoService
    ) {}
  

  @Output() onAnalisisCreado = new EventEmitter<any>();
  @Output() onCerrar = new EventEmitter<void>();


  nuevoAnalisis = '';
  analisisEditado:AnalisisRapido = {
      horneado: false,
      humo: false,
      uniforme: false,
      verde: false,
      arrebatado: false,
      oscuro: false,
      comentario: ''
    };

  guardar() {
      this.analisisRapidoService.createAnalisis(this.analisisEditado).subscribe({
        next: (res) => {
          this.onAnalisisCreado.emit();
          this.cerrar();
        },
        error: (err) => {
          console.error(err);
        }
      });
    
  }

  cerrar() {
    this.onCerrar.emit();
  }
}


