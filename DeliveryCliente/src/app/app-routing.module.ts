import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { DomicilioComponent } from './pages/domicilio/domicilio.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';


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
    path:'pedido', component:PedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
