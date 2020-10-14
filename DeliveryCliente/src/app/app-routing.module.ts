import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { DomicilioComponent } from './pages/domicilio/domicilio.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { HistorialPedidosComponent } from './pages/historial-pedidos/historial-pedidos.component';


const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'perfil', component:PerfilComponent
  },
  {
    path:'domicilio', component:DomicilioComponent
  },
  {
    path:'pedidos-pendientes', component:PedidosComponent
  },
  {
    path:'pedidos-historial', component:HistorialPedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
