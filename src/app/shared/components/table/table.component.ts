import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-table',
  imports: [NgFor,MatIconModule,NgIf],
  templateUrl: './table.component.html',
  styles: ''
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() onEdit!: (row: any) => void;
  @Input() onDelete!: (row: any) => void;
  @Input() onComplete!: (row: any) => void;
  @Input() mostrarCompletar = false;
  @Input() mostrarEliminar = true;
  @Input() mostrarEditar = true;
  @Output() rowClick = new EventEmitter<any>();
}
