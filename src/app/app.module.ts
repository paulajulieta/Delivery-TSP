import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ModalIngresoComponent } from './components/modal-ingreso/modal-ingreso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { ModalAbmUsuarioComponent } from './components/modal-abm-usuario/modal-abm-usuario.component';
import { AbmInsumosComponent } from './pages/abm-insumos/abm-insumos.component';
import { ModalAbmInsumoComponent } from './components/modal-abm-insumo/modal-abm-insumo.component';
import { AbmManufacturadosComponent } from './pages/abm-manufacturados/abm-manufacturados.component';
import { ModalAbmManufacturadosComponent } from './components/modal-abm-manufacturados/modal-abm-manufacturados.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ModalDetallePedidoComponent } from './components/modal-detalle-pedido/modal-detalle-pedido.component';
import { ModalFacturaComponent } from './components/modal-factura/modal-factura.component';
import { StockComponent } from './pages/stock/stock.component';
import { ComidasMasPedidasComponent } from './pages/comidas-mas-pedidas/comidas-mas-pedidas.component';
import {ChartModule} from 'primeng/chart';
import { PedidosPorClienteComponent } from './pages/pedidos-por-cliente/pedidos-por-cliente.component';
import { PedidosPorPeriodoComponent } from './pages/pedidos-por-periodo/pedidos-por-periodo.component';
import { RecaudacionesComponent } from './pages/recaudaciones/recaudaciones.component';
import { PantallaCajeroComponent } from './pages/pantalla-cajero/pantalla-cajero.component';
import { PedidosFacturadosComponent } from './pages/pedidos-facturados/pedidos-facturados.component';
import { PantallaCocineroComponent } from './pages/pantalla-cocinero/pantalla-cocinero.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ModalIngresoComponent,
    GestionUsuariosComponent,
    ModalAbmUsuarioComponent,
    AbmInsumosComponent,
    ModalAbmInsumoComponent,
    AbmManufacturadosComponent,
    ModalAbmManufacturadosComponent,
    PedidosComponent,
    ModalDetallePedidoComponent,
    ModalFacturaComponent,
    StockComponent,
    ComidasMasPedidasComponent,
    PedidosPorClienteComponent,
    PedidosPorPeriodoComponent,
    RecaudacionesComponent,
    PantallaCajeroComponent,
    PedidosFacturadosComponent,
    PantallaCocineroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
