import { AlertaService } from './../../../../../shared/services/alerta.service';
import { AnalisisService } from './../../../shared/service/analisis.service';
import { AnalisisFisicoService } from './../../service/analisis-fisico.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrearAnalisisFisicoComponent } from '../crear-analisis/crear-analisis.component';
import { AgregarLoteMuestraComponent } from '../../../shared/agregar-lote-muestra/agregar-lote-muestra.component';
import { AnalisisFisico } from '../../../../../interfaces/analisisFisico.interface';
import { ConfirmacionService } from '../../../../../shared/services/confirmacion.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-analisis-fisico-simultaneo',
  imports: [CrearAnalisisFisicoComponent, AgregarLoteMuestraComponent,NgIf,NgFor,FormsModule,NgClass],
  templateUrl: './analisis-fisico-simultaneo.component.html',
  styles: ``
})
export class AnalisisFisicoSimultaneoComponent {

  constructor(
    private readonly analisisFisicoService: AnalisisFisicoService,
    private readonly AnalisisService : AnalisisService,
    private readonly alertaService: AlertaService,
    private readonly confirmacionService: ConfirmacionService
  ){}

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onAnalisisCreado = new EventEmitter<any>();
  selecciones: { tipo: string, id: string }[] = [];
  mostrarAgregar: boolean = false;
  analisisPorItem: {
    [id: string]: {
    analisis: AnalisisFisico;
    modo: 'editar' | 'nuevo';
    };
  } = {};


  analisis : AnalisisFisico = {
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
  };
  
  async guardarSeleccion(seleccion: { tipo: string, id: string }) {
  const yaExiste = this.selecciones.some(s => s.tipo === seleccion.tipo && s.id === seleccion.id);
  if (yaExiste) {
    this.alertaService.mostrar('info', 'Este ítem ya fue agregado');
    return;
  }

  this.selecciones.push(seleccion);
  this.cerrarAgregar();

  // Buscar análisis solo una vez al agregar
  this.AnalisisService.getAnalisisByLoteId(seleccion.id).subscribe({
      next: async (analisis) => {
        if (analisis?.analisisFisico_id) {
          const confirmar = await this.confirmacionService.solicitarConfirmacion({
            titulo: 'Análisis ya existente',
            mensaje: '¿Deseas editar el último análisis o crear uno nuevo?',
            textoConfirmar: 'Editar',
            textoCancelar: 'Crear nuevo'
          });
          if (confirmar) {
            this.analisisFisicoService.getAnalisisById(analisis.analisisFisico_id).subscribe({
              next: (analisisFisico) => {
                this.registrarAnalisis(seleccion.id, analisisFisico, 'editar');
              }
            });
          } else {
            const nuevo = this.crearAnalisisVacio();
            this.registrarAnalisis(seleccion.id, nuevo, 'nuevo');
          }
        } else {
          const nuevo = this.crearAnalisisVacio();
          this.registrarAnalisis(seleccion.id, nuevo, 'nuevo');
        }
      },
      error: () => {
        const nuevo = this.crearAnalisisVacio();
        this.registrarAnalisis(seleccion.id, nuevo, 'nuevo');
      }
    });
  }

  registrarAnalisis(id: string, analisis: AnalisisFisico, modo: 'editar' | 'nuevo') {
    this.analisisPorItem[id] = {
      analisis,
      modo
    };
    this.analisis = analisis;
  }


  mostrarAnalisisDe(item: { tipo: string, id: string }) {
    const registro = this.analisisPorItem[item.id];
    if (registro) {
      this.analisis = registro.analisis;
      console.log(`Modo seleccionado: ${registro.modo}`);
    } else {
      this.alertaService.mostrar('warning', 'Este ítem aún no tiene análisis cargado.');
    }
  }
  
  eliminarSeleccion(item: { tipo: string, id: string }, event: Event) {
    event.stopPropagation(); // Evita que dispare `mostrarAnalisisDe`
    this.selecciones = this.selecciones.filter(s => s.id !== item.id);
    delete this.analisisPorItem[item.id];
  }


  crearAnalisisVacio(): AnalisisFisico {
    return {
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
    };
  }
  
  abrirAgregar() {
    this.mostrarAgregar = true;
  }

  cerrarAgregar() {
    this.mostrarAgregar = false;
  }

  cerrar() {
   this.onCerrar.emit();
  }
}
