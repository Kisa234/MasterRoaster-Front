import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CrearAnalisisComponent } from '../../components/crear-analisis/crear-analisis.component';
import { AnalisisRapidoService } from '../../service/analisis-rapido.service';
import { AnalisisRapido } from '../../../../../interfaces/analisisRapido.interface';
import { EditarAnalisisRapidoComponent } from "../../components/editar-analisis-rapido/editar-analisis-rapido.component";



@Component({
  selector: 'app-analisis-fisico-rapido',
  imports: [CommonModule, TableComponent, RouterModule, FormsModule, CrearAnalisisComponent, EditarAnalisisRapidoComponent],
  standalone: true,
  templateUrl: './analisis-fisico-rapido.component.html',
  styles: ''
})
export class AnalisisFisicoRapidoComponent implements OnInit {

  constructor(
    private readonly analisisRapidoService: AnalisisRapidoService,
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
    'horneado',
    'humo',
    'uniforme',
    'verde',
    'arrebatado',
    'oscuro',
    'comentario'
  ];

  rows: {
    id: string;
    fecha_registro: string;
    horneado: string;
    humo: string;
    uniforme: string;
    verde: string;
    arrebatado: string;
    oscuro: string;
    comentario: string
  }[] = [

  ]

  getAllAnalisis() {
    this.analisisRapidoService.getAllAnalisis().subscribe({
      next: (response) => {
        if (response) {
          this.rows = response.map((analisis: AnalisisRapido) => ({
            id: analisis.id_analisis_rapido ?? '',
            fecha_registro: new Date(analisis.fecha_registro ?? new Date()).toLocaleDateString('es-ES'),
            horneado: analisis.horneado.toString(),
            humo: analisis.humo.toString(),
            uniforme: analisis.uniforme.toString(),
            verde: analisis.verde.toString(),
            arrebatado: analisis.arrebatado.toString(),
            oscuro: analisis.oscuro.toString(),
            comentario: analisis.comentario ?? ''
          }));
        } else {
          this.rows = [];
        }
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

    this.analisisRapidoService.deleteAnalisis(row.id).subscribe({
      next: () => {
        this.getAllAnalisis();
      },
      error: (error) => console.error('Error al eliminar el lote:', error),
    });
  }
}
