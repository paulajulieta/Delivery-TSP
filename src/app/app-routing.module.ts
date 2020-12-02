import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardPageGuard } from './guard/auth-guard-page.guard';
import { RolAdminGuard } from './guard/rol-admin.guard';
import { RolCajeroGuard } from './guard/rol-cajero.guard';
import { RolCocineroGuard } from './guard/rol-cocinero.guard';
import { AbmInsumosComponent } from './pages/abm-insumos/abm-insumos.component';
import { AbmManufacturadosComponent } from './pages/abm-manufacturados/abm-manufacturados.component';
import { ComidasMasPedidasComponent } from './pages/comidas-mas-pedidas/comidas-mas-pedidas.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { HomeComponent } from './pages/home/home.component';
import { PantallaCajeroComponent } from './pages/pantalla-cajero/pantalla-cajero.component';
import { PantallaCocineroComponent } from './pages/pantalla-cocinero/pantalla-cocinero.component';
import { PedidosFacturadosComponent } from './pages/pedidos-facturados/pedidos-facturados.component';
import { PedidosPorClienteComponent } from './pages/pedidos-por-cliente/pedidos-por-cliente.component';
import { PedidosPorPeriodoComponent } from './pages/pedidos-por-periodo/pedidos-por-periodo.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { RecaudacionesComponent } from './pages/recaudaciones/recaudaciones.component';
import { StockComponent } from './pages/stock/stock.component';


const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'home', component:HomeComponent },
  { path:'usuarios', component:GestionUsuariosComponent/* , canActivate:[AuthGuardPageGuard, RolAdminGuard]  */},
  { path:'abm-insumos', component:AbmInsumosComponent/* , canActivate:[AuthGuardPageGuard, RolAdminGuard]  */},
  { path:'abm-manufacturados', component:AbmManufacturadosComponent/* , canActivate:[AuthGuardPageGuard]  */},
  { path:'pedidos', component:PedidosComponent/* , canActivate:[AuthGuardPageGuard, RolAdminGuard]  */},
  { path:'stock', component:StockComponent/* , canActivate:[AuthGuardPageGuard, RolAdminGuard] */ },
  { path:'comidas-mas-pedidas', component:ComidasMasPedidasComponent/* , canActivate:[AuthGuardPageGuard, RolAdminGuard] */},
  { path:'pedidos-por-cliente', component:PedidosPorClienteComponent/* , canActivate:[AuthGuardPageGuard, RolAdminGuard] */},
  { path:'pedidos-por-periodo', component:PedidosPorPeriodoComponent/* , canActivate:[AuthGuardPageGuard, RolAdminGuard] */},
  { path:'recaudaciones', component:RecaudacionesComponent/* , canActivate:[AuthGuardPageGuard, RolAdminGuard] */},
  { path:'pedidos-cajero', component:PantallaCajeroComponent/* , canActivate:[AuthGuardPageGuard,RolCajeroGuard] */},
  { path:'facturas-cajero', component:PedidosFacturadosComponent/* , canActivate:[AuthGuardPageGuard,RolCajeroGuard] */},
  { path:'pedidos-cocinero', component:PantallaCocineroComponent/* , canActivate:[AuthGuardPageGuard,RolCocineroGuard] */}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
