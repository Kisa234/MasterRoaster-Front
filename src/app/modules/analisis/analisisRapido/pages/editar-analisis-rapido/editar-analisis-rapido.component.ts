import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalisisRapidoService } from '../../service/analisis-rapido.service';
import { AnalisisRapido } from '../../../../../interfaces/analisisRapido.interface';

@Component({
  selector: 'app-editar-analisis-rapido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-analisis-rapido.component.html',
  styles: ``
})
export class EditarAnalisisRapidoComponent implements OnInit {
  
  constructor(
    private readonly analisisRapidoService: AnalisisRapidoService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.analisisRapidoService.getAnalisisById(this.id).subscribe({
        next: (response) => {
          if (response) {
            this.analisisEditado = response;
          }
        }
      });
    }
  }
  
  @Input() id:string = '';
  @Output() onAnalisisCreado = new EventEmitter<any>();
  @Output() onCerrar = new EventEmitter<void>();

  analisisEditado:AnalisisRapido = {
    id_analisis_rapido: this.id,
    horneado: false,
    humo: false,
    uniforme: false,
    verde: false,
    arrebatado: false,
    oscuro: false,
    comentario: ''
  };


  guardar() {
    this.analisisRapidoService.updateAnalisis(this.id, this.analisisEditado).subscribe();
    this.onAnalisisCreado.emit();
    this.cerrar();
  }

  cerrar() {
    this.onCerrar.emit();
  }
}
