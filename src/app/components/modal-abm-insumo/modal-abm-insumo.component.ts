import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloInsumo } from 'src/app/models/ArticuloInsumo';
import { CategoriaGeneral } from 'src/app/models/CategoriaGeneral';
import { Imagen } from 'src/app/models/Imagen';
import { UnidadMedida } from 'src/app/models/UnidadDeMedida';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-modal-abm-insumo',
  templateUrl: './modal-abm-insumo.component.html',
  styleUrls: ['./modal-abm-insumo.component.scss']
})
export class ModalAbmInsumoComponent implements OnInit {

  @Input() insumo:ArticuloInsumo
  formularioInsumo:FormGroup
  categorias:CategoriaGeneral[]=[]
  unidadesMed:UnidadMedida[]=[];
  insumoNuevo:ArticuloInsumo={};
  imgNueva:Imagen={};

  constructor(private fb:FormBuilder, private insumoService:ArticulosService) { }

  ngOnInit(): void {
    
    this.insumoService.getAllCategorias().subscribe((categoriasApi)=>{
      this.categorias=categoriasApi;
    })
    this.insumoService.getAllUnidadDeMed().subscribe((unidadesApi)=>{
      this.unidadesMed=unidadesApi;
    })
    this.formularioInsumo=this.fb.group({
      id:[''],
      nombre:['', Validators.required],
      descripcion:['', Validators.required],
      precioCompra:['', Validators.required],
      precioVta:['', Validators.required],
      stockActual:['', Validators.required],
      stockMin:['', Validators.required],
      stockMax:['', Validators.required],
      esInsumo:['', Validators.required],
      unidadDeMed:['', Validators.required],
      categoria:['', Validators.required],
      img:['', Validators.required]
    })

    
  }

  traerDatos(){
    if(this.insumo!==null){
      this.formularioInsumo.controls['id'].setValue(this.insumo.id);
      this.formularioInsumo.controls['nombre'].setValue(this.insumo.nombre);
      this.formularioInsumo.controls['descripcion'].setValue(this.insumo.descripcion);
      this.formularioInsumo.controls['precioCompra'].setValue(this.insumo.precioCompra);
      this.formularioInsumo.controls['precioVta'].setValue(this.insumo.precioVta);
      this.formularioInsumo.controls['stockActual'].setValue(this.insumo.stockActual);
      this.formularioInsumo.controls['stockMin'].setValue(this.insumo.stockMin);
      this.formularioInsumo.controls['stockMax'].setValue(this.insumo.stockMax);
      this.formularioInsumo.controls['esInsumo'].setValue(this.insumo.esInsumo);
      this.formularioInsumo.controls['unidadDeMed'].setValue(this.insumo?.unidadDeMed?.id);
      this.formularioInsumo.controls['categoria'].setValue(this.insumo?.categoria?.id);
      this.formularioInsumo.controls['img'].setValue(this.insumo.img.url);
    }else{
      this.formularioInsumo.controls['id'].setValue('');
      this.formularioInsumo.controls['nombre'].setValue('');
      this.formularioInsumo.controls['descripcion'].setValue('');
      this.formularioInsumo.controls['precioCompra'].setValue('');
      this.formularioInsumo.controls['precioVta'].setValue('');
      this.formularioInsumo.controls['stockActual'].setValue('');
      this.formularioInsumo.controls['stockMin'].setValue('');
      this.formularioInsumo.controls['stockMax'].setValue('');
      this.formularioInsumo.controls['esInsumo'].setValue('');
      this.formularioInsumo.controls['unidadDeMed'].setValue('');
      this.formularioInsumo.controls['categoria'].setValue('');
      this.formularioInsumo.controls['img'].setValue('');
    }
  }

  save(){
    if(this.formularioInsumo.controls['id'].value==='' ||this.formularioInsumo.controls['id'].value==='null' ||this.formularioInsumo.controls['id'].value===null){
      this.insumoNuevo.nombre=this.formularioInsumo.controls['nombre'].value;
      this.insumoNuevo.descripcion=this.formularioInsumo.controls['descripcion'].value;
      this.insumoNuevo.precioCompra=this.formularioInsumo.controls['precioCompra'].value;
      this.insumoNuevo.precioVta=this.formularioInsumo.controls['precioVta'].value;
      this.insumoNuevo.stockActual=this.formularioInsumo.controls['stockActual'].value;
      this.insumoNuevo.stockMin=this.formularioInsumo.controls['stockMin'].value;
      this.insumoNuevo.stockMax=this.formularioInsumo.controls['stockMax'].value;
      this.insumoNuevo.esInsumo=this.formularioInsumo.controls['esInsumo'].value;
      this.imgNueva.url=this.formularioInsumo.controls['img'].value;
      this.insumoNuevo.img=this.imgNueva;
      
      for(let categoria of this.categorias){
        if(categoria.id.toString() === this.formularioInsumo.controls['categoria'].value){
          this.insumoNuevo.categoria=categoria;
        }
      }
      for(let uniMed of this.unidadesMed){
        if(uniMed.id.toString() === this.formularioInsumo.controls['unidadDeMed'].value){
          this.insumoNuevo.unidadDeMed=uniMed;
        }
      }
      
      this.insumoService.postInsumo(this.insumoNuevo).subscribe((res)=>{
        window.location.reload();
      })
    }else{
      this.insumoNuevo.id=this.formularioInsumo.controls['id'].value;
      this.insumoNuevo.nombre=this.formularioInsumo.controls['nombre'].value;
      this.insumoNuevo.descripcion=this.formularioInsumo.controls['descripcion'].value;
      this.insumoNuevo.precioCompra=this.formularioInsumo.controls['precioCompra'].value;
      this.insumoNuevo.precioVta=this.formularioInsumo.controls['precioVta'].value;
      this.insumoNuevo.stockActual=this.formularioInsumo.controls['stockActual'].value;
      this.insumoNuevo.stockMin=this.formularioInsumo.controls['stockMin'].value;
      this.insumoNuevo.stockMax=this.formularioInsumo.controls['stockMax'].value;
      this.insumoNuevo.esInsumo=this.formularioInsumo.controls['esInsumo'].value;
      
      for(let categoria of this.categorias){
        if(categoria.id.toString() === this.formularioInsumo.controls['categoria'].value){
          this.insumoNuevo.categoria=categoria;
        }
      }
      for(let uniMed of this.unidadesMed){
        if(uniMed.id.toString() === this.formularioInsumo.controls['unidadDeMed'].value){
          this.insumoNuevo.unidadDeMed=uniMed;
        }
      }
      if(this.insumo.img.url===this.formularioInsumo.controls['img'].value){
        this.insumoNuevo.img=this.insumo.img;
      }else{
        this.imgNueva.url=this.formularioInsumo.controls['img'].value;
        this.insumoNuevo.img=this.imgNueva;
      }
      this.insumoService.putInsumo(this.insumoNuevo, this.insumoNuevo.id).subscribe((res)=>{
        window.location.reload();
      })
    }
  }

}
