import { AnalisisSensorial } from './../../../../../interfaces/analisisSensorial.interface';
import { AnalisisSensorialService } from './../../service/analisis-sensorial.service';
import { AlertaService } from './../../../../../shared/services/alerta.service';
import { AnalisisService } from './../../../shared/service/analisis.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AgregarLoteMuestraComponent } from '../../../shared/agregar-lote-muestra/agregar-lote-muestra.component';
import { ConfirmacionService } from '../../../../../shared/services/confirmacion.service';
import { FormsModule } from '@angular/forms';
import { CrearAnalisisSensorialComponent } from "../crear-analisis/crear-analisis.component";

@Component({
  selector: 'app-analisis-sensorial-simultaneo',
  imports: [CrearAnalisisSensorialComponent, AgregarLoteMuestraComponent, NgIf, NgFor, FormsModule, NgClass, CrearAnalisisSensorialComponent],
  templateUrl: './analisis-sensorial-simultaneo.component.html',
  styles: ``
})
export class AnalisisSensorialSimultaneoComponent {
   constructor(
    private readonly analisisSensorialService: AnalisisSensorialService,
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
    analisis: AnalisisSensorial;
    modo: 'editar' | 'nuevo';
    };
  } = {};

  analisis: AnalisisSensorial = {
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
        console.log('Análisis encontrado:', analisis);
        if (analisis?.analisisSensorial_id) {
          const confirmar = await this.confirmacionService.solicitarConfirmacion({
            titulo: 'Análisis ya existente',
            mensaje: '¿Deseas editar el último análisis o crear uno nuevo?',
            textoConfirmar: 'Editar',
            textoCancelar: 'Crear nuevo'
          });
          if (confirmar) {
            this.analisisSensorialService.getAnalisisById(analisis.analisisSensorial_id).subscribe({
              next: (analisisSensorial) => {
                console.log('Análisis sensorial encontrado:', analisisSensorial);
                this.registrarAnalisis(seleccion.id, analisisSensorial, 'editar');
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

  registrarAnalisis(id: string, analisis: AnalisisSensorial, modo: 'editar' | 'nuevo') {
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

  crearAnalisisVacio(): AnalisisSensorial {
    return {
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
