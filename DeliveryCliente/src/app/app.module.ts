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
    ModalDetallePlatoComponent
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
