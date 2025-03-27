import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  @Input() isHidden = true;



}
