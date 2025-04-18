import { Routes } from '@angular/router';

import { AnalisisFisicoRapidoComponent } from './modules/analisis/analisisRapido/pages/analisis-fisico-rapido/analisis-fisico-rapido.component';
import { AnalisisFisicoComponent } from './modules/analisis/analisisFisico/pages/analisis-fisico/analisis-fisico.component';
import { AnalisisSensorialComponent } from './modules/analisis/analisisSensorial/pages/analisis-sensorial/analisis-sensorial.component';
import { LoteComponent } from './modules/lote/pages/lote/lote.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { MuestraComponent } from './modules/muestra/pages/muestra/muestra.component';
import { DashboardComponent } from './shared/dashboard/pages/dashboard/dashboard.component';
import { LoteTostadoComponent } from './modules/lote-tostado/pages/lote-tostado/lote-tostado.component';
import { TuesteComponent } from './modules/tuestes/pages/tueste/tueste.component';
import { PedidoComponent } from './modules/pedidos/pages/pedido/pedido.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'analisis-fisico-rapido', component: AnalisisFisicoRapidoComponent },
      { path: 'analisis-fisico', component: AnalisisFisicoComponent },
      { path: 'analisis-sensorial', component: AnalisisSensorialComponent },
      { path: 'muestra', component: MuestraComponent },
      { path: 'lotes', component: LoteComponent },
      { path: 'lotes-tostados', component: LoteTostadoComponent },
      { path: 'pedidos', component: PedidoComponent },
      { path: 'tuestes', component: TuesteComponent },

  ]},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
