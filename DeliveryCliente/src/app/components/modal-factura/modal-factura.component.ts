import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Factura } from 'src/app/models/Factura';
import { PedidoService } from 'src/app/services/pedido.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

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

  /* descargarFactura(){

    var data=document.getElementById('facturaPdf');
    html2canvas(data).then(canvas=>{
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF(); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 1, 15, imgWidth, imgHeight)
      pdf.save('factura_'+this.factura.id+'_'+this.factura.fecha+'.pdf'); // Generated PDF
     
    });

    const data=document.getElementById('facturaPdf');
    const doc=new jsPDF('p', 'mm', 'a4');
    const options={
      background:'white',
      scale:3
    };

    html2canvas(data, options).then((canvas)=>{
      const img=canvas.toDataURL('image/png');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight);
      return doc;
    }).then((docResult) => {
      docResult.save('factura_'+this.factura.id+'_'+this.factura.fecha+'.pdf');
    });
    
  } */

  descargarFactura(){
    var data=document.getElementById('facturaPdf');
    domtoimage.toPng(data).then((dataUrl)=>{
      let imagen=new Image();
      imagen.src=dataUrl;
      let pdf = new jsPDF();
      pdf.addImage(imagen, 1, 10, 208, 270);
      pdf.save('factura_'+this.factura.id+'_fecha_'+this.factura.fecha+'.pdf')
    })
    /* html2canvas(data).then(canvas=>{
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF(); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 1, 15, imgWidth, imgHeight)
      pdf.save('factura_'+this.factura.id+'_'+this.factura.fecha+'.pdf'); // Generated PDF
     
    }); */

  }
}
