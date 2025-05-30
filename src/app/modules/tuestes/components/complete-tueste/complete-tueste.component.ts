import { AlertaService } from './../../../../shared/services/alerta.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tueste } from '../../../../interfaces/tueste.interface';
import { FormsModule } from '@angular/forms';
import { TuesteService } from '../../service/service.service';

@Component({
  selector: 'app-complete-tueste',
  imports: [FormsModule],
  templateUrl: './complete-tueste.component.html',
  styles: ``
})
export class CompleteTuesteComponent implements OnInit {

  constructor(
    private readonly tuesteservice: TuesteService,
    private readonly alertaService :AlertaService
  ) {}

  @Input()  id: string = '';
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onComplete = new EventEmitter<any>();

  ngOnInit(): void {
    this.tuesteservice.getTuesteById(this.id).subscribe(
      (res) => {
        this.tueste.id_tueste = res.id_tueste;
        this.tueste.peso_entrada = res.peso_entrada;
        this.tueste.peso_salida = res.peso_salida;
        this.tueste.merma = res.merma;
        this.tueste.agtrom_comercial = res.agtrom_comercial;
        this.tueste.agtrom_gourmet = res.agtrom_gourmet;
      },
      (error) => {
        console.error('Error al obtener el tueste:', error);
      }
    );
  }
  
  tueste:Tueste={
    id_tueste      : '',
    peso_entrada    : 0,
    peso_salida     : 0,
    merma           : 0,
    agtrom_comercial: 0,
    agtrom_gourmet  : 0,
  }

  calcularMerma(){
      this.tueste.merma = this.tueste.peso_entrada! - this.tueste.peso_salida!;
      //hacer merma un % 
      this.tueste.merma = parseFloat(((this.tueste.merma / this.tueste.peso_entrada!) * 100).toFixed(1));
  }

  calcularAgtrom(){
    this.tueste.agtrom_gourmet = parseFloat(((this.tueste.agtrom_comercial! * 1.528) * 0.74294).toFixed(1));
  }
  
  cerrar(){
    this.onCerrar.emit();
  }
  
  submit(){
    console.log(this.tueste)
    this.tuesteservice.completarTostado(this.id, this.tueste).subscribe(
      (res) => {
        this.alertaService.mostrar('success','Tueste completado con exito');
        this.onComplete.emit();
        this.onCerrar.emit()

      },
      (error) => {
        this.alertaService.mostrar('error','Error al completa el tueste');
      }
    );
  }


}
