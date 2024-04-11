import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  constructor() { }
  convert(html: any, fileName: string) {

    // const DATA = document.getElementById("content") as HTMLCanvasElement;
    // html2canvas(DATA).then(canvas => {        
    //   let fileWidth = 200;
    //   let fileHeight = canvas.height * fileWidth / canvas.width;

    //   const FILEURI = canvas.toDataURL('image/png')
    //   let PDF = new jsPDF('p', 'mm', 'a4');
    //   let position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 5, 5, fileWidth, fileHeight)      
    //   PDF.save(fileName+ '_' + new Date().toLocaleDateString()+'.pdf');
    // });  ;

    const data = document.getElementById("content") as HTMLCanvasElement;
    html2canvas(data).then((canvas: any) => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      heightLeft -= pageHeight;
      const doc = new jsPDF('p', 'mm');
      doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }
      doc.save(fileName+ '_' + new Date().toLocaleDateString()+'.pdf');
    });
  }
}
