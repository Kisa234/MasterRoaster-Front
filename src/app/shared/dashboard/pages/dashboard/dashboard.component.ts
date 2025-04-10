import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router'; // Importamos RouterOutlet

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet], // Agregamos RouterOutlet
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {
  isSidebarHidden = true;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
