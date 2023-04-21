import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LegendLabelsContentArgs } from "@progress/kendo-angular-charts";
// import * as FileSaver from 'file-saver';
// import * as html2canvas from 'html2canvas';
// import * as jspdf from 'jspdf';


@Component({
  selector: 'app-show-reports',
  templateUrl: './show-reports.component.html',
  styleUrls: ['./show-reports.component.css']
})
export class ShowReportsComponent implements OnInit {

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
    console.log("Data----",this.data);
    if(this.showStatusReport == true)
    {
      this.assetName=JSON.parse(localStorage.getItem('assetName'));
      this.total=this.assetName.length;
      this.pieData = [
        { category: "Completed", value: this.data.Completed, colorField:'rgb(80,227,194)' },
        { category: "Overdue", value: this.data.Overdue,colorField:'rgb(234,66,86)' },
        { category: "Upcoming", value: this.data.Upcoming, colorField:'rgb(245,187,35)' },
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
    // const pdf = new Blob([document.getElementById('content').innerHTML], { type: 'application/pdf' });
    // FileSaver.saveAs(pdf, 'html-to-pdf.pdf');
  }
  
  

}
