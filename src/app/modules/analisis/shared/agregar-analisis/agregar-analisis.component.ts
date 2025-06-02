import { AnalisisFisico } from './../../../../interfaces/analisisFisico.interface';
import { Analisis } from './../../../../interfaces/analisis.interface';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CrearAnalisisSensorialComponent } from "../../analisisSensorial/components/crear-analisis/crear-analisis.component";
import { CrearAnalisisComponent } from "../../analisisRapido/components/crear-analisis/crear-analisis.component";
import { CrearAnalisisFisicoComponent } from '../../analisisFisico/components/crear-analisis/crear-analisis.component';
import { NgIf } from '@angular/common';
import { ReporteAnalisisComponent } from "../reporte-analisis/reporte-analisis.component";

@Component({
  selector: 'app-agregar-analisis',
  imports: [
    CrearAnalisisSensorialComponent,
    CrearAnalisisFisicoComponent,
    NgIf
],
  templateUrl: './agregar-analisis.component.html',
  styles: ``
})
export class AgregarAnalisisComponent {

  af: boolean = false;
  as: boolean = false;
  r : boolean = false;


  @Input() id: string = '';
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  AnalisisFisico():void{
    this.af = true;
    this.as = false;
    this.r = false;
  }
  AnalisisSensorial():void{
    this.as = true;
    this.af = false;
    this.r = false;
  }
  Reporte():void{
    this.r = true;
    this.as = false;
    this.af = false;
  }

  cerrar() {
   this.onCerrar.emit();
  }
}
