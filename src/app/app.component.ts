import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertaComponent } from './shared/components/alerta/alerta.component';
import { AlertaService } from './shared/services/alerta.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, AlertaComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'MasterRoaster';
  mensaje = '';
  tipo: 'success' | 'error' | 'info' | 'warning' = 'info';
  mostrarAlerta = false;

  constructor(private alertaService: AlertaService) {
    this.alertaService.alerta$.subscribe(alerta => {
      this.tipo = alerta.tipo;
      this.mensaje = alerta.mensaje;
      this.mostrarAlerta = true;

      setTimeout(() => {
        this.mostrarAlerta = false;
      }, 3000);
    });
  }
}
