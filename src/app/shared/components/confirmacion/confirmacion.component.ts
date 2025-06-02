import { NgIf } from "@angular/common";
import { ConfirmacionData, ConfirmacionService } from "../../services/confirmacion.service";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-confirmacion',
  imports: [NgIf],
  templateUrl: './confirmacion.component.html',
  styles: []
})
export class ConfirmacionComponent implements OnInit {
  mostrar = false;
  data!: ConfirmacionData;

  constructor(
    private confirmacionService: ConfirmacionService,
    private cdRef: ChangeDetectorRef // ✅ inyección correcta
  ) {
    this.confirmacionService.confirmacion$.subscribe(data => {
      this.data = data;
      this.mostrar = true;
      this.cdRef.detectChanges(); // ✅ funciona ahora
    });
  }


  ngOnInit() {
    this.confirmacionService.confirmacion$.subscribe(data => {
      this.data = data;
      this.mostrar = true;
      this.cdRef.detectChanges();
    });
  }

  confirmar() {
    this.data.resolver(true);
    this.mostrar = false;
  }

  cancelar() {
    this.data.resolver(false);
    this.mostrar = false;
  }

  cerrarPorFondo() {
    this.cancelar();
  }
}
