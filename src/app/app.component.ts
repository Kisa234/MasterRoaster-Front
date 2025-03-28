import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./modules/auth/pages/login/login.component";
import { RegisterComponent } from "./modules/auth/pages/register/register.component";
import { DashboardComponent } from "./modules/dashboard/pages/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'FortunatoFront';
}
