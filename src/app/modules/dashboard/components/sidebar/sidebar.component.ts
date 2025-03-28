import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [NgIf,RouterModule],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  @Input() isHidden = true;

  isAnalisisMenuOpen = false;

  toggleAnalisisMenu() {
    this.isAnalisisMenuOpen = !this.isAnalisisMenuOpen;
  }

}
