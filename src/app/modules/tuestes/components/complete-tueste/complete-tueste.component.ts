import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tueste } from '../../../../interfaces/tueste.interface';
import { FormsModule } from '@angular/forms';
import { TuesteService } from '../../service/service.service';

@Component({
  selector: 'app-complete-tueste',
  imports: [FormsModule],
  templateUrl: './complete-tueste.component.html',
  styles: ``
})
export class CompleteTuesteComponent implements OnInit {

  constructor(
    private readonly tuesteservice: TuesteService,
  ) {}

  @Input()  id: string = '';
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onComplete = new EventEmitter<any>();

  ngOnInit(): void {
    
  }
  
  tueste:Tueste={
    peso_salida     : 0,
    merma           : 0,
    agtrom_comercial: 0,
    agtrom_gourmet  : 0,
  }

  completarTueste() {
    this.tuesteservice.updateTueste(this.id,this.tueste).subscribe((res) => {

    });
    this.onComplete.emit();
  }
  
  cerrar(){
    this.onCerrar.emit();
  }
  
  submit(){}


}
