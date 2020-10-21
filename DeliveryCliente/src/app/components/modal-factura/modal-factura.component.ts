import { Component, Input, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/Factura';
import { PedidoService } from 'src/app/services/pedido.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-modal-factura',
  templateUrl: './modal-factura.component.html',
  styleUrls: ['./modal-factura.component.scss']
})
export class ModalFacturaComponent implements OnInit {

  @Input() pedidoId:number;
  factura:Factura={}
  constructor(private pedidoService:PedidoService) { }

  ngOnInit(): void {
  }

  traerDetalle(){
    console.log(this.pedidoId);
    this.pedidoService.getOneFacturaByPedido(this.pedidoId).subscribe((res)=>{
      this.factura=res as Factura;
      console.log(this.factura);
    })
  }

  descargarFactura(){
    var data=document.getElementById('factura');
    html2canvas(data).then(canvas=>{
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('factura_'+this.factura.id+'_'+this.factura.fecha+'.pdf'); // Generated PDF
    });
    
  }
}
