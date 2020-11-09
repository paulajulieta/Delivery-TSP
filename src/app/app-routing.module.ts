import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardPageGuard } from './guard/auth-guard-page.guard';
import { RolAdminGuard } from './guard/rol-admin.guard';
import { RolCocineroGuard } from './guard/rol-cocinero.guard';
import { AbmInsumosComponent } from './pages/abm-insumos/abm-insumos.component';
import { AbmManufacturadosComponent } from './pages/abm-manufacturados/abm-manufacturados.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { HomeComponent } from './pages/home/home.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { StockComponent } from './pages/stock/stock.component';


const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'home', component:HomeComponent },
  { path:'usuarios', component:GestionUsuariosComponent, canActivate:[AuthGuardPageGuard, RolAdminGuard] },
  { path:'abm-insumos', component:AbmInsumosComponent, canActivate:[AuthGuardPageGuard, RolAdminGuard] },
  { path:'abm-manufacturados', component:AbmManufacturadosComponent, canActivate:[AuthGuardPageGuard] },
  { path:'pedidos', component:PedidosComponent, canActivate:[AuthGuardPageGuard, RolAdminGuard] },
  { path:'stock', component:StockComponent, canActivate:[AuthGuardPageGuard, RolAdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
