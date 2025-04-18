import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { LoteTostadoService } from '../../service/lote-tostado.service';


@Component({
  selector: 'app-lote-tostado',
  imports: [TableComponent, FormsModule],
  templateUrl: './lote-tostado.component.html',
  styles: ``
})
export class LoteTostadoComponent implements OnInit {
  constructor(
    private readonly loteTostadoService: LoteTostadoService,
  ){}

  ngOnInit() {
    this.getLotesTostados();
  }

  filtro: string = '';
  mostrarModal: boolean = false;
  mostrarModalLote: boolean = false;
  mostrarModalLoteMuestra: boolean = false;
  loteIdActual: string = '';
  today = Date.now();

  columns = [
    'id',
    'perfil tostado',
    'peso (KG)',
    'fecha tostado'
  ];

  rows: {
    id: string;
    "perfil tostado": string;
    "peso (KG)" : number;
    "fecha tostado": string;
  }[] = [];


  getLotesTostados(){
    this.loteTostadoService.getLotesTostados().subscribe({
      next: (response) => {
        this.rows = response.map((lote) => ({
          id: lote.id_lote_tostado!,
          "perfil tostado": lote.perfil_tostado,
          "peso (KG)": lote.peso,
          "fecha tostado": new Date(lote.fecha_tostado).toLocaleDateString('es-ES')
        }));
      }
    });
  }





  editRow(row: any) {
    this.loteIdActual = row.id;
    this.mostrarModalLote = true;
  }

  deleteRow(row: any) {

  }
}
