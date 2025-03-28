import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-analisis-rapido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './crear-analisis.component.html',
})
export class CrearAnalisisComponent {
  @Output() onAnalisisCreado = new EventEmitter<any>();
  @Output() onCerrar = new EventEmitter<void>();

  form: FormGroup;
  nuevoAnalisis = '';



  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      horneado: [false],
      humo: [false],
      uniforme: [false],
      verde: [false],
      arrebatado: [false],
      oscuro: [false],
      comentario: [''],
    });
  }

  guardar() {
    if (this.form.valid) {
      this.onAnalisisCreado.emit(this.form.value);
      this.cerrar();
    }
  }

  cerrar() {
    this.onCerrar.emit();
  }
}


