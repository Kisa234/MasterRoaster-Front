import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CrearAnalisisFisicoComponent } from "../../components/crear-analisis/crear-analisis.component";
import { AnalisisFisicoService } from '../../service/analisis-fisico.service';
import { AnalisisFisico } from '../../../../../interfaces/analisisFisico.interface';
import { EditarAnalisisFisicoComponent } from '../../components/editar-analisis-fisico/editar-analisis-fisico.component';


@Component({
  selector: 'app-analisis-fisico',
  standalone: true,
  templateUrl: './analisis-fisico.component.html',
  imports: [NgIf, FormsModule, RouterModule, TableComponent, CrearAnalisisFisicoComponent,EditarAnalisisFisicoComponent]
})
export class AnalisisFisicoComponent implements OnInit {

  constructor(
    private readonly analisisFisicoService: AnalisisFisicoService,
  ) {}

  ngOnInit(): void {
    this.getAllAnalisis();
  }

  filtro: string = '';
  mostrarModal: boolean = false;
  mostrarModalEditar: boolean = false;
  AnalisisIdActual : string = '';

  columns = [
    'fecha_registro',
    'grado',
    'comentario'
  ];

  rows: {
    id: string;
    fecha_registro: any;
    grado: any;
    comentario: any
  }[] = [];

  getAllAnalisis() {
    this.analisisFisicoService.getAllAnalisis().subscribe({
      next: (response) => {
        this.rows = response.map((analisis: AnalisisFisico) => ({
          id: analisis.id_analisis_fisico,
          fecha_registro: new Date(analisis.fecha_registro).toLocaleDateString('es-ES'),
          grado: analisis.grado,
          comentario: analisis.comentario
        }));
      }
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

    this.analisisFisicoService.deleteAnalisis(row.id).subscribe({
      next: () => {
        this.getAllAnalisis();
      },
      error: (error) => console.error('Error al eliminar el lote:', error),
    });
  }


}
