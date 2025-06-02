import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { FormsModule } from '@angular/forms';
import { CrearAnalisisSensorialComponent } from "../../components/crear-analisis/crear-analisis.component";
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AnalisisSensorialService } from '../../service/analisis-sensorial.service';
import { EditarAnalisisSensorialComponent } from '../../components/editar-analisis-sensorial/editar-analisis-sensorial.component';
import { AnalisisSensorialSimultaneoComponent } from '../../components/analisis-sensorial-simultaneo/analisis-sensorial-simultaneo.component';

@Component({
  selector: 'app-analisis-sensorial',
  imports: [NgIf, FormsModule, RouterModule, TableComponent,AnalisisSensorialSimultaneoComponent,EditarAnalisisSensorialComponent],
  templateUrl: './analisis-sensorial.component.html',
})
export class AnalisisSensorialComponent implements OnInit {

  constructor (
    private analisisService: AnalisisSensorialService
  ) { }

  ngOnInit(): void {
    this.getAllAnalisis();
  }

  AnalisisIdActual: string = '';
  filtro: string = '';
  mostrarModal: boolean = false;
  mostrarModalEditar: boolean = false;

  columns = [
    'id',
    'fecha_registro',
    'puntaje',
    'comentario'
  ];

  rows :{
    id: string;
    fecha_registro: string;
    puntaje: string;
    comentario: string;
  }[]= [

  ]

  getAllAnalisis() {
    this.analisisService.getAllAnalisisSensorial().subscribe((res) => {
        this.rows = res.map((analisis) => {
          return {
            id: analisis.id_analisis_sensorial,
            fecha_registro: new Date(analisis.fecha_registro ?? new Date()).toLocaleDateString('es-ES'),
            puntaje: analisis.puntaje_taza.toString(),
            comentario: analisis.comentario
          }
        });
    });
  }



  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mostrarModalEditar = false;
  }


  actualizarAnalisis() {
    this.cerrarModal();
    this.getAllAnalisis();
  }

  editarAnalisis(row:any){
    this.AnalisisIdActual = row.id;
    this.mostrarModalEditar = true;
  }

  eliminarAnalisis(row:any){

    this.analisisService.deleteAnalisisSensorial(row.id).subscribe({
      next: () => {
        this.getAllAnalisis();
      },
      error: (error) => console.error('Error al eliminar el lote:', error),
    });
  }

}

