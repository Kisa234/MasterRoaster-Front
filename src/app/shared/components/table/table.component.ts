import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-table',
  imports: [NgFor,MatIconModule ],
  templateUrl: './table.component.html',
  styles: ''
})
export class TableComponent {
  @Input() columns: string[] = []; 
  @Input() data: any[] = []; 
  @Input() onEdit!: (row: any) => void; 
  @Input() onDelete!: (row: any) => void;
}
