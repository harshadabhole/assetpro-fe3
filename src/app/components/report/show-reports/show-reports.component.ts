import { Component,OnInit} from '@angular/core';
import { LegendLabelsContentArgs } from "@progress/kendo-angular-charts";
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-show-reports',
  templateUrl: './show-reports.component.html',
  styleUrls: ['./show-reports.component.css']
})
export class ShowReportsComponent implements OnInit {
  pdfSrc: string;
showStatusReport:boolean=false;
showHistoricalReport:boolean=false;
loading:boolean=false;
data:any;
pieData:any;
assetName: any;
total:any;
  siteID: string;
  siteName: string;
  constructor() { 
    this.loading=true;
    this.showStatusReport = localStorage.getItem('maintenanceStatusReport') != null ? true : false;
    this.showHistoricalReport = localStorage.getItem('maintenanceHistoricalReport') != null ? true : false;
    this.siteID=localStorage.getItem('siteID');
    this.siteName=localStorage.getItem('siteName');
  }

  ngOnInit() {
    this.data=localStorage.getItem('maintenanceStatusReport') != null ? JSON.parse(localStorage.getItem('maintenanceStatusReport')) : JSON.parse(localStorage.getItem('maintenanceHistoricalReport'))
    if(this.showStatusReport == true)
    {
      this.assetName=JSON.parse(localStorage.getItem('assetName'));
      this.total=this.assetName.length;
      this.pieData = [
        { category: "Completed", value: this.data.count[0].Completed, colorField:'rgb(80,227,194)' },
        { category: "Overdue", value: this.data.count[0].Overdue,colorField:'rgb(234,66,86)' },
        { category: "Upcoming", value: this.data.count[0].Upcoming, colorField:'rgb(245,187,35)' },
      ];
      this.labelContent = this.labelContent.bind(this);
      this.loading=false;
    }
    else
    {

    }

  }

  labelContent(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.value}`;
  }

  generatePDF() 
  {
    const documentDefinition = {
          defaultStyle: {
        font: 'Helvetica Neue',
        fontSize : 14
      },
      pageSize: 'A4',
      content: []
    };

    html2canvas(document.querySelector('#content')).then(canvas => {
      const imgData = canvas.toDataURL('image/png'); // Convert the canvas to a data URL
      documentDefinition.content.push({
        image: imgData, // Add the image to the document definition
        width: 550 // Set the width of the image
      });
    
      // Generate the PDF document
      pdfMake.createPdf(documentDefinition).download('report.pdf');
    });

  }
  
  

}
