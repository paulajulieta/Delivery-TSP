import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloInsumo } from 'src/app/models/ArticuloInsumo';
import { CategoriaGeneral } from 'src/app/models/CategoriaGeneral';
import { DetalleManufacturado } from 'src/app/models/DetalleManufacturado';
import { Imagen } from 'src/app/models/Imagen';
import { Plato } from 'src/app/models/Plato';
import { ArticulosService } from 'src/app/services/articulos.service';
import Swal from 'sweetalert2';
declare var $ : any;

@Component({
  selector: 'app-modal-abm-manufacturados',
  templateUrl: './modal-abm-manufacturados.component.html',
  styleUrls: ['./modal-abm-manufacturados.component.scss']
})
export class ModalAbmManufacturadosComponent implements OnInit {
  @Input() manufacturado:Plato;
  detalles:DetalleManufacturado[]=[];
  formularioManufacturado:FormGroup
  formularioManufacturadoDetalle:FormGroup
  categorias:CategoriaGeneral[]=[];
  insumos:ArticuloInsumo[]=[];
  insumoApi:ArticuloInsumo[]=[];
  detalleEnvio:DetalleManufacturado={};
  platoEnvio:Plato={}
  constructor(private fb:FormBuilder, private articuloService:ArticulosService) { }

  ngOnInit(): void {
    this.articuloService.getAllCategoriasPlato().subscribe((categoriasApi)=>{
      this.categorias=categoriasApi;
    })
    this.articuloService.getAllInsumo().subscribe((insumoApi)=>{
      this.insumos=insumoApi;
      for(let insumo of this.insumos){
        if(insumo.esInsumo){
          this.insumoApi.push(insumo);
        }
      }
      this.insumos=this.insumoApi
    })

    console.log(this.manufacturado)
    
    this.formularioManufacturado=this.fb.group({
      id:[''],
      nombre:['', Validators.required],
      tpoPreparacion:['', Validators.required],
      precio:['', Validators.required],
      categoria:['', Validators.required],
      img:['', Validators.required]
    })
    this.formularioManufacturadoDetalle=this.fb.group({
      id:[''],
      insumoDetalle:['', Validators.required],
      cantidad:['', Validators.required]
    })
  }

  traerDatos(){
    if(this.manufacturado===null){
      this.formularioManufacturado.controls['id'].setValue('');
      this.formularioManufacturado.controls['nombre'].setValue('');
      this.formularioManufacturado.controls['tpoPreparacion'].setValue('');
      this.formularioManufacturado.controls['precio'].setValue('');
      this.formularioManufacturado.controls['categoria'].setValue('');
      this.formularioManufacturado.controls['img'].setValue('');
      this.detalleEnvio={}
      this.manufacturado={};
      this.manufacturado.detalles=null;
      this.manufacturado.detalles=[];
      this.platoEnvio={};
      console.log(this.manufacturado.detalles)
    }else{
      this.formularioManufacturado.controls['id'].setValue(this.manufacturado?.id);
      this.formularioManufacturado.controls['nombre'].setValue(this.manufacturado?.nombre);
      this.formularioManufacturado.controls['tpoPreparacion'].setValue(this.manufacturado?.tiempoPreparacion);
      this.formularioManufacturado.controls['precio'].setValue(this.manufacturado?.precio);
      this.formularioManufacturado.controls['categoria'].setValue(this.manufacturado?.categoriaGral?.id);
      this.formularioManufacturado.controls['img'].setValue(this.manufacturado?.img?.url);
      this.detalleEnvio={}
      this.platoEnvio={};
    }
  }

  traerDetalles(detalle:DetalleManufacturado){
    if(detalle!==null){
      this.formularioManufacturadoDetalle.controls['id'].setValue(detalle?.id);
      this.formularioManufacturadoDetalle.controls['cantidad'].setValue(detalle?.cantidad);
      this.formularioManufacturadoDetalle.controls['insumoDetalle'].setValue(detalle?.insumo?.id);
      this.detalleEnvio={}
      $("#selectInsumo").prop('disabled', true);
    }else{
      this.formularioManufacturadoDetalle.controls['id'].setValue('');
      this.formularioManufacturadoDetalle.controls['cantidad'].setValue('');
      this.formularioManufacturadoDetalle.controls['insumoDetalle'].setValue('');
      this.detalleEnvio={}
      $("#selectInsumo").prop('disabled', false);
    }
  }

  agregarDetalle(){
    if(this.formularioManufacturadoDetalle.controls['id'].value===''){
      
      this.detalleEnvio.cantidad=this.formularioManufacturadoDetalle.controls['cantidad'].value;
      for(let insumo of this.insumos){
        if(insumo.id.toString()===this.formularioManufacturadoDetalle.controls['insumoDetalle'].value){
          this.detalleEnvio.insumo=insumo;
        }
      }
      if(this.manufacturado.id===undefined){
        this.manufacturado.detalles.push(this.detalleEnvio);
        this.detalleEnvio=null
      }else{
        this.detalleEnvio.manufacturado={};
        this.detalleEnvio.manufacturado.id=this.manufacturado.id;
        this.manufacturado.detalles.push(this.detalleEnvio);
        this.detalleEnvio=null
      }
      
      /* this.articuloService.postDetalleManufacturado(this.detalleEnvio).subscribe((res)=>{
        this.manufacturado.detalles.push(res);
      }) */
      
    }else{
      this.detalleEnvio.id=this.formularioManufacturadoDetalle.controls['id'].value;
      this.detalleEnvio.cantidad=this.formularioManufacturadoDetalle.controls['cantidad'].value;
      for(let insumo of this.insumos){
        if(insumo.id===this.formularioManufacturadoDetalle.controls['insumoDetalle'].value){
          this.detalleEnvio.insumo=insumo;
          break;
        }
      }
      this.detalleEnvio.manufacturado=this.manufacturado;
      this.articuloService.putDetalleManufacturado(this.detalleEnvio, this.detalleEnvio.id).subscribe((res)=>{
        for(let detalle of this.manufacturado.detalles){
          if(detalle.id===res.id){
            detalle.cantidad=res.cantidad;
            break;
          }
        }
      })
    }
  }
  save(){
    if(this.formularioManufacturado.controls['id'].value==='' || this.formularioManufacturado.controls['id'].value===0){
      console.log(this.formularioManufacturado.controls['id'].value)
      this.platoEnvio.nombre=this.formularioManufacturado.controls['nombre'].value;
      this.platoEnvio.tiempoPreparacion=this.formularioManufacturado.controls['tpoPreparacion'].value;
      this.platoEnvio.precio=this.formularioManufacturado.controls['precio'].value;
      var imagenNueva:Imagen={}
      imagenNueva.url=this.formularioManufacturado.controls['img'].value;
      this.platoEnvio.img=imagenNueva
      for(let categoria of this.categorias){
        if(categoria.id.toString()===this.formularioManufacturado.controls['categoria'].value){
          this.platoEnvio.categoriaGral=categoria;
          break;
        }
      }
      this.platoEnvio.detalles=this.manufacturado.detalles;
      console.log(this.platoEnvio)
      this.articuloService.postManufacturado(this.platoEnvio).subscribe((res)=>{
        Swal.fire({
          icon: 'success',
          title: 'Se agregó correctamente',
          showConfirmButton: false,
          timer: 1000
        })
        window.location.reload();
      })
      this.platoEnvio=null;
      this.manufacturado=null;
    }else{
      this.platoEnvio.id=this.formularioManufacturado.controls['id'].value;
      this.platoEnvio.nombre=this.formularioManufacturado.controls['nombre'].value;
      this.platoEnvio.tiempoPreparacion=this.formularioManufacturado.controls['tpoPreparacion'].value;
      this.platoEnvio.precio=this.formularioManufacturado.controls['precio'].value;
      if(this.manufacturado.img.url===this.formularioManufacturado.controls['img'].value){
        this.platoEnvio.img=this.manufacturado.img
      }else{
        var imagenNueva:Imagen={}
        imagenNueva.url=this.formularioManufacturado.controls['img'].value;
        this.platoEnvio.img=imagenNueva;
      }

      for(let categoria of this.categorias){
        if(categoria.id===parseInt(this.formularioManufacturado.controls['categoria'].value)){
          this.platoEnvio.categoriaGral=categoria;
        }
      }
      this.platoEnvio.detalles=this.manufacturado.detalles;
      console.log(this.platoEnvio)
      this.articuloService.putManufacturado(this.platoEnvio, this.manufacturado.id).subscribe((res)=>{
        this.manufacturado=res;
        this.manufacturado=null;
        this.platoEnvio=null;
        Swal.fire({
          icon: 'success',
          title: 'Se modificó correctamente',
          showConfirmButton: false,
          timer: 1000
        })
        window.location.reload();
      })
    }
  }

  deleteDetalle(id:number, idInsumo:number){
    if(id===null || id===0 || id===undefined){
      for(var i:number=0; i<this.manufacturado.detalles.length; i++){
        if(this.manufacturado.detalles[i].insumo.id===idInsumo){
          Swal.fire({
            icon: 'success',
            title: 'Se eliminó correctamente',
            showConfirmButton: false,
            timer: 1000
          })
          this.manufacturado.detalles.splice(i, 1);
          break;
        }
      }
    }else{
      this.articuloService.deleteDetalleManufacturado(id).subscribe((res)=>{
        for(var i:number=0; i<this.manufacturado.detalles.length; i++){
          if(this.manufacturado.detalles[i].id===id){
            Swal.fire({
              icon: 'success',
              title: 'Se eliminó correctamente',
              showConfirmButton: false,
              timer: 1000
            })
            this.manufacturado.detalles.splice(i, 1);
            break;
          }
        }
      })
    }
    
  }

  cerrarModal(){
    this.detalles=[]
    this.manufacturado=null
    $("#modalManufacturado").modal('hide');
  }

}
