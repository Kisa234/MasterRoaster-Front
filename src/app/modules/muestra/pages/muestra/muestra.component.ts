import { Component, OnInit } from '@angular/core';
import { CrearLoteComponent } from '../../../lote/pages/crear-lote/crear-lote.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CrearmuestraComponent } from "../crear-muestra/crear-muestra.component";
import { MuestraService } from '../../service/muestra.service';

@Component({
  selector: 'app-muestra',
  imports: [NgIf, FormsModule, RouterModule, TableComponent, CrearmuestraComponent, CrearmuestraComponent],
  templateUrl: './muestra.component.html',
  styles:""
})
export class MuestraComponent implements OnInit{

  constructor(
    public readonly muestraService:MuestraService,
  ) { }

  ngOnInit(): void {
    this.getMuestras();
  }

  filtro: string = '';
  mostrarModal: boolean = false;

  columns = [
    'Nombre',
    'Peso',
    'Cliente',
    'Fecha de Registro',
  ];

  rows: { Nombre: string; Peso: number; Cliente: string; fecha: Date }[] = [];

  getMuestras() {
    this.muestraService.getMuestras().subscribe((res) => {
      this.rows = res.map((muestra) => {
        return {
          Nombre: muestra.nombre,
          Peso: muestra.peso,
          Cliente: muestra.user_id,
          fecha: muestra.fecha_registro,
        };
      });
    });
  }


  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarAnalisis() {

    this.cerrarModal();
  }
}
