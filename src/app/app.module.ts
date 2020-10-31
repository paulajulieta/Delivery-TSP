import { BrowserModule } from '@angular/platform-browser';
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
    ModalAbmInsumoComponent
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
