import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { AnalisisFisicoRapidoComponent } from './modules/analisis/analisisRapido/pages/analisis-fisico-rapido/analisis-fisico-rapido.component';
import { AnalisisFisicoComponent } from './modules/analisis/analisisFisico/pages/analisis-fisico/analisis-fisico.component';
import { AnalisisSensorialComponent } from './modules/analisis/analisisSensorial/pages/analisis-sensorial/analisis-sensorial.component';
import { LoteComponent } from './modules/lote/pages/lote/lote.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { MuestraComponent } from './modules/muestra/pages/muestra/muestra.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'analisis-fisico-rapido', component: AnalisisFisicoRapidoComponent },
      { path: 'analisis-fisico', component: AnalisisFisicoComponent },
      { path: 'analisis-sensorial', component: AnalisisSensorialComponent },
      { path: 'lotes', component: LoteComponent },
      { path: 'muestra', component: MuestraComponent },
  ]},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
