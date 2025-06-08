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
import { lastValueFrom } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  selectedItemId: string | null = null;
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
    
      // solicitamos el análisis actual para decidir
      this.AnalisisService.getAnalisisByLoteId(seleccion.id).subscribe({
        next: async (analisis) => {
          const tieneFisico    = Boolean(analisis?.analisisFisico_id);
          const tieneSensorial = Boolean((analisis as any)?.analisisSensorial_id);
        
          // 1) Si hay físico pero NO sensorial → error y NO agregamos
          if (tieneFisico && !tieneSensorial) {
            this.alertaService.mostrar(
              'error',
              `El Analisis del lote ${seleccion.id} no esta completo. Debe tener análisis sensorial para poder completarse.`,
            );
            return;
          }
        
          // A partir de aquí sí que agregamos a la lista y cerramos el modal
          this.selecciones.push(seleccion);
          this.cerrarAgregar();
        
          // 2) Si hay sensorial pero NO físico → sólo crear uno nuevo
          if (!tieneFisico && tieneSensorial) {
            const nuevo = this.crearAnalisisVacio();
            this.registrarAnalisis(seleccion.id, nuevo, 'nuevo');
            return;
          }
        
          // 3) Si no hay ninguno → crear nuevo
          if (!tieneFisico && !tieneSensorial) {
            const nuevo = this.crearAnalisisVacio();
            this.registrarAnalisis(seleccion.id, nuevo, 'nuevo');
            return;
          }
        
          // 4) Si tiene ambos → preguntar Editar o Crear nuevo
          const confirmar = await this.confirmacionService.solicitarConfirmacion({
            titulo: 'Análisis ya existente',
            mensaje: 'Este lote ya tiene análisis físico y sensorial. ¿Editar último o crear uno nuevo?',
            textoConfirmar: 'Editar',
            textoCancelar: 'Crear nuevo'
          });
        
          if (confirmar) {
            this.analisisFisicoService.getAnalisisById(analisis.analisisFisico_id)
              .subscribe(af => this.registrarAnalisis(seleccion.id, af, 'editar'));
          } else {
            const nuevo = this.crearAnalisisVacio();
            this.registrarAnalisis(seleccion.id, nuevo, 'nuevo');
          }
        },
        error: () => {
          // Si falla la petición, lo tratamos como "no hay análisis" y permitimos crear uno nuevo
          this.selecciones.push(seleccion);
          this.cerrarAgregar();
          const nuevo = this.crearAnalisisVacio();
          this.registrarAnalisis(seleccion.id, nuevo, 'nuevo');
        }
      });
    }



  registrarAnalisis(id: string, analisis: AnalisisFisico, modo: 'editar' | 'nuevo') {
    // 1) guardo o sobreescribo el analisis en el map
    this.analisisPorItem[id] = { analisis, modo };
    // 2) apunto this.analisis al objeto correspondiente
    this.analisis = this.analisisPorItem[id].analisis;
    // 3) marco este id como el actualmente activo
    this.selectedItemId = id;
  }


  mostrarAnalisisDe(item: { tipo: string, id: string }) {
    // Si ya había uno activo, guarda sus cambios
    if (this.selectedItemId) {
      this.analisisPorItem[this.selectedItemId].analisis = this.analisis;
    }

    const registro = this.analisisPorItem[item.id];
    if (!registro) {
      this.alertaService.mostrar('warning', 'Este ítem aún no tiene análisis cargado.');
      return;
    }

    // Apunta al nuevo
    this.analisis = registro.analisis;
    this.selectedItemId = item.id;
    console.log(`Modo seleccionado: ${registro.modo}`);
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

  async guardarTodosAnalisis() {
    // 1) Asegúrate de guardar el análisis activo en el map
    if (this.selectedItemId) {
      this.analisisPorItem[this.selectedItemId].analisis = this.analisis;
    }

    // 2) Crea una promesa por cada lote/muestra
    const tasks = this.selecciones.map(item => {
      const { analisis, modo } = this.analisisPorItem[item.id];

      if (modo === 'nuevo') {
        // createAnalisis(data, id_lote)
        return lastValueFrom(
          this.analisisFisicoService.createAnalisis(analisis, item.id)
        );
      } else {
        // updateAnalisis(id_lote, data)
        return lastValueFrom(
          this.analisisFisicoService.updateAnalisis(item.id, analisis)
        );
      }
    });

    // 3) Ejecuta todas las peticiones en paralelo
    try {
      await Promise.all(tasks);
      this.alertaService.mostrar('success', 'Todos los análisis físicos se guardaron correctamente.');
      this.onAnalisisCreado.emit();
      this.cerrar();
    } catch (e: any) {
      this.alertaService.mostrar('error', `Error al guardar: ${e.message}`);
    }
  }

}
