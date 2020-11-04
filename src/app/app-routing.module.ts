import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbmInsumosComponent } from './pages/abm-insumos/abm-insumos.component';
import { AbmManufacturadosComponent } from './pages/abm-manufacturados/abm-manufacturados.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'home', component:HomeComponent },
  { path:'usuarios', component:GestionUsuariosComponent },
  { path:'abm-insumos', component:AbmInsumosComponent },
  { path:'abm-manufacturados', component:AbmManufacturadosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
