import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalIngresoComponent } from './components/modal-ingreso/modal-ingreso.component';
import { HomeComponent } from './pages/home/home.component';
import { ModalRegistroComponent } from './components/modal-registro/modal-registro.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BarraIzqComponent } from './components/barra-izq/barra-izq.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ModalDetallePlatoComponent } from './components/modal-detalle-plato/modal-detalle-plato.component';
import { ModalEditarUsuarioComponent } from './components/modal-editar-usuario/modal-editar-usuario.component';
import { ModalCambiarContrasenaComponent } from './components/modal-cambiar-contrasena/modal-cambiar-contrasena.component';
import { DomicilioComponent } from './pages/domicilio/domicilio.component';
import { ModalDomicilioComponent } from './components/modal-domicilio/modal-domicilio.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ModalCarritoComponent } from './components/modal-carrito/modal-carrito.component';
import { ModalDetallePedidoComponent } from './components/modal-detalle-pedido/modal-detalle-pedido.component';
import { HistorialPedidosComponent } from './pages/historial-pedidos/historial-pedidos.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardComponent,
    FooterComponent,
    ModalIngresoComponent,
    HomeComponent,
    ModalRegistroComponent,
    BarraIzqComponent,
    PerfilComponent,
    ModalDetallePlatoComponent,
    ModalEditarUsuarioComponent,
    ModalCambiarContrasenaComponent,
    DomicilioComponent,
    ModalDomicilioComponent,
    PedidosComponent,
    ModalCarritoComponent,
    ModalDetallePedidoComponent,
    HistorialPedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
