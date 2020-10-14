import { Component, OnInit } from '@angular/core';
import { Plato } from 'src/app/models/Plato';
import { PlatoService } from 'src/app/services/plato.service';
import { InsumoService } from 'src/app/services/insumo.service';
import { ArticuloInsumo } from 'src/app/models/ArticuloInsumo';
import { Usuario } from 'src/app/models/Usuario';
import { User } from 'firebase';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images:Array<string>;
  platos:Plato[];
  bebidas:ArticuloInsumo[];
  platosBD:Plato[];
  bebidasBD:ArticuloInsumo[];
  usuario:User;
  usuarioApi:Usuario;
  constructor(private platoService: PlatoService, private insumoService: InsumoService, private usuarioService:UsuarioService, private authService:AuthService) { }

  ngOnInit(): void {
    this.images=["./assets/images/pizza-clasica.png", "./assets/images/hamburguesa1.png", "./assets/images/empanadas.jpg"];
    this.platoService.getAllPlato().subscribe((platosApi)=>{
      this.platosBD=platosApi;
      this.platos=this.platosBD
      console.log(this.platos);
    });
    this.insumoService.getAllNoInsumos().subscribe((bebidasApi)=>{
      this.bebidasBD=bebidasApi;
      this.bebidas=this.bebidasBD;
      console.log(this.bebidas);
    });
    this.authService.isAuth().subscribe((usuario)=>{
      if(usuario!=null){
        this.usuario=usuario;
        this.usuarioService.getEmail(this.usuario.email).subscribe((usuarioRes)=>{
          this.usuarioApi=usuarioRes;
          console.log(usuarioRes);
        })
      }
    })
  }

  buscarPlatos(platoBuscado:string){
    this.platos=this.platosBD.filter(plato=>{
      return plato.nombre.toLowerCase().includes(platoBuscado.toLowerCase());
    })
  }

  buscarBebida(bebidaBuscada:string){
    this.bebidas=this.bebidasBD.filter(bebida=>{
      return bebida.nombre.toLowerCase().includes(bebidaBuscada.toLowerCase());
    })
  }

}
