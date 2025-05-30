import { AnalisisService } from '../service/analisis.service';
import { AlertaService } from '../../../../shared/services/alerta.service';
import { LoteService } from '../../../lote/service/lote.service';
import { AnalisisSensorial } from '../../../../interfaces/analisisSensorial.interface';
import { AnalisisFisicoService } from '../../analisisFisico/service/analisis-fisico.service';
import { AnalisisSensorialService } from '../../analisisSensorial/service/analisis-sensorial.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnalisisFisico } from '../../../../interfaces/analisisFisico.interface';
import { Lote } from '../../../../interfaces/lote.interface';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormatoFechaPipe } from '../../../../shared/pipes/formato-fecha.pipe';
import { switchMap, tap } from 'rxjs';
import { Analisis } from '../../../../interfaces/analisis.interface';
import { SpiderGraphComponent } from "../../../../shared/components/spider-graph/spider-graph.component";

@Component({
  selector: 'app-reporte-analisis',
  imports: [NgFor, FormsModule, FormatoFechaPipe, SpiderGraphComponent],
  templateUrl: './reporte-analisis.component.html',
  styles: ``
})
export class ReporteAnalisisComponent implements OnInit{

  constructor(
    private readonly analisisSensorialService : AnalisisSensorialService,
    private readonly analisisFisicoService :AnalisisFisicoService,
    private readonly analisisService: AnalisisService,
    private readonly loteService: LoteService,
    private readonly alertaService: AlertaService
  ){}

  ngOnInit(): void {
    this.getData();
  }

  

  @Input() id = '';
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();

  lote : Lote = {
    productor: '',
    finca: '',
    region: '',
    departamento: '',
    peso: 0,
    variedades: [],
    proceso: '',
    id_analisis:''
  }

  analisis:Analisis = {
    id_analisis: '',
    fecha_registro: new Date,
    analisisFisico_id: '',
    analisisSensorial_id: ''
  }

  analisisFisico:AnalisisFisico = {
    id_analisis_fisico: '',
    fecha_registro: new Date(),
    peso_muestra: 0,
    peso_pergamino: 0,
    wa: 0,
    temperatura_wa: 0,
    humedad: 0,
    temperatura_humedad: 0,
    densidad: 0,
    color_grano_verde: '',
    olor: '',
    superior_malla_18: 0,
    superior_malla_16: 0,
    superior_malla_14: 0,
    menor_malla_16: 0,
    peso_defectos: 0,
    quaquers: 0,
    peso_muestra_tostada: 0,
    desarrollo: 0,
    pocentaje_caramelizcacion: 0,
    c_desarrollo: 0,
    grado: '',
    comentario: '',
    defectos_primarios: [],
    defectos_secundarios: []
  }

  analisisSensorial : AnalisisSensorial =  {
    id_analisis_sensorial: '',
    fragancia_aroma: 0,
    sabor: 0,
    sabor_residual: 0,
    acidez: 0,
    cuerpo: 0,
    uniformidad: 0,
    balance: 0,
    taza_limpia: 0,
    dulzor: 0,
    puntaje_catador: 0,
    taza_defecto_ligero: 0,
    tazas_defecto_rechazo: 0,
    puntaje_taza: 0,
    comentario: '',
    fecha_registro: new Date()
  }

  radarChartLabels: string[] = [
    'fragancia_aroma',
    'acidez',
    'cuerpo',
    'sabor',
    'balance',
    'sabor_residual',
  ];
  data: number[] = [
    
  ]

  getData(){
    this.loteService.getLoteById(this.id).pipe(
    tap(lote => this.lote = lote),
    switchMap(lote => this.analisisService.getAnalisisById(lote.id_analisis!)),
    tap(analisis => this.analisis = analisis),
    switchMap(analisis => this.analisisFisicoService.getAnalisisById(analisis.analisisFisico_id)),
    tap(fisico => this.analisisFisico = fisico),
    switchMap(() => this.analisisSensorialService.getAnalisisById(this.analisis.analisisSensorial_id)),
    tap(sensorial => 
      {this.analisisSensorial = sensorial
        this.data = [
          sensorial.fragancia_aroma,
          sensorial.acidez,
          sensorial.cuerpo,
          sensorial.sabor,
          sensorial.balance,
          sensorial.sabor_residual
        ];
      })
  ).subscribe({
    error: () => this.alertaService.mostrar('error', 'Error al cargar los análisis')
  });
  }  

  cerrar() {
    this.onCerrar.emit();
  }

}
