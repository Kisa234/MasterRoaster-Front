import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tueste } from '../../../../interfaces/tueste.interface';
import { TuesteService } from '../../service/service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-tueste',
  imports: [FormsModule],
  templateUrl: './edit-tueste.component.html',
  styles: ``
})
export class EditTuesteComponent implements OnInit {
  
  constructor(
    private readonly tuesteService: TuesteService,
  ) {}

  ngOnInit() {
    this.cargarTueste();
  }

  @Input()  id: string = '';
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  tueste:Tueste={
    id_tueste                 :'',
    densidad                  : 0,
    humedad                   : 0,
    peso_entrada              : 0,
    temperatura_entrada       : 0,
    llama_inicial             : 0,
    aire_inicial              : 0,
    punto_no_retorno          : 0,
    tiempo_despues_crack      : 0,
    temperatura_crack         : 0,
    temperatura_salida        : 0,
    tiempo_total              : 0,
    porcentaje_caramelizacion : 0,
    desarrollo                : 0,
    grados_desarrollo         : 0,
    
  }

  cargarTueste() {
    const saved = localStorage.getItem(`tueste-edit-${this.id}`);
    if (saved) {
      this.tueste = {...JSON.parse(saved)};
    } 
    
    this.tuesteService.getTuesteById(this.id).subscribe((tueste: Tueste) => {
      this.tueste = {...tueste};
    });
    
  }
  

  actualizarLocalStorage() {
    localStorage.setItem(`tueste-edit-${this.id}`, JSON.stringify(this.tueste));
  }
  

  guardarTueste() {
    this.tuesteService.updateTueste(this.id,this.tueste).subscribe((tueste: Tueste) => {
      this.onAnalisisCreado.emit(tueste);
      this.onCerrar.emit();
    });
    this.onAnalisisCreado.emit();
  }

  cerrar() {
    this.actualizarLocalStorage();
    this.onCerrar.emit();
  }

  submit() {
    this.guardarTueste();
  }

}
