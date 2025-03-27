import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {
  isSidebarHidden = true;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
