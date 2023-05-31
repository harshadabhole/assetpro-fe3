import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/shared/services/site.service';
import { LegendLabelsContentArgs } from "@progress/kendo-angular-charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DatePipe]
})
export class DashboardComponent implements OnInit {

  last7DaysDates:any=[];
  dates:any;
  date1:any;
  currentDate:any;
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  startDate:any;
  endDate:any;
  label:any;
  label1:any;
  label2:any;
  selectedSite:any;
  categories:any=[];
  clickedDate: any;
  data1:any=[];
  data2:any=[];
  isClicked:boolean=false;
  loading:boolean=false;
  onlineCount:number=0;
  offlineCount:number=0;
  unitCounts: any=[];
  showSpinner: boolean=false;
  faultCodes: any=[];
  showFaultCode: boolean=false;
  selectedCompany:any;
  faultCodesByCharger: any;
  showCharger: boolean=false;
  showFault: boolean=false;

  constructor(
    private datePipe: DatePipe,
    private _siteService:SiteService,
    ) { 
      this.loading=true;
      this._siteService.updatedCompanyId.subscribe((res: any) => {
        this.selectedCompany = this._siteService.getselectedCompany();
        if(this.selectedCompany == '')
        {
          const today = new Date();
          const year = today.getFullYear();
          const month = (today.getMonth() + 1).toString().padStart(2, '0');
          const day = today.getDate().toString().padStart(2, '0');
          this.date1 = `${year}-${month}-${day}`;
          this.currentDate=`${year}-${month}-${day}`;
        }
       
      })
      this._siteService.updatedSiteId.subscribe((res: any) => {
        this.selectedSite = this._siteService.getselectedSite();
        if(this.selectedSite !=='')
        {
          this.loading=true;
          this.showFaultCode=true;
          this.getUnitCount();
          this.getFaultCodeByCharger();
          this.getFaultCodeByFaultCode();
          this.getPowerUsage();
        }
        else
        {
          this.showFaultCode=false;
          const today = new Date();
          const year = today.getFullYear();
          const month = (today.getMonth() + 1).toString().padStart(2, '0');
          const day = today.getDate().toString().padStart(2, '0');
          this.date1 = `${year}-${month}-${day}`;
          this.currentDate=`${year}-${month}-${day}`;
        }
      })
      
    }
   

  ngOnInit() {

  }
  
  
  
  getLastSevenDays()
  {
    this.last7DaysDates=[];
    this.dates=[];
    for (let i = 6; i >= 0; i--) 
    {
        const day = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - i);
        this.last7DaysDates.push(day);
    }

    this.last7DaysDates.sort((a:any, b:any) => a - b);
    this.last7DaysDates.map((date:any) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const days =this.daysOfWeek[date.getDay()];
      let xx=`${month}/${day}/${year}`
      const xxx=
      {
        date:xx,
        day:days
      }
      this.dates.push(xxx)
    });
  
  }
  
  
  isToday(dateString: string): boolean {
    const today = this.isClicked==false ? new Date():new Date(this.clickedDate);
     const date = new Date(dateString);
     return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
   }

   onDate(event:any,date:any)
   {
     this.isClicked=true;
     let xx=date.split('/')
     this.clickedDate=new Date(`${xx[2]}-${xx[0]}-${xx[1]}`);
      this.loading=true;
      this.getLastSevenDays();
   }


  onChangeDate(event: any): void 
  {
    this.showSpinner=true;
    let d=new Date();
    let today=new Date(event.target.value);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const year1 = d.getFullYear();
    const month1 = String(d.getMonth() + 1).padStart(2, '0');
    const day1 = String(d.getDate()).padStart(2, '0');

    this.endDate=`${year}-${month}-${day}`;
    this.date1=this.endDate;
  
    const d1=`${year1}-${month1}-${day1}`
    const data={
      SiteID:this.selectedSite,
      date:this.endDate
    }
      if(d1 != this.endDate)
      {
        this.categories=[];
        this.data1=[];
        this.data2=[];
        this._siteService.getPowerUsage(data).subscribe((res:any)=>{
        this.data1=res.Data.map((obj:any) => ({ category: obj.Hour, value1: obj.MaxkW }));
        this.data2=res.Data.map((obj:any) => ({ category: obj.Hour, value2: obj.Charger }));
        this.categories=res.Data.map((obj:any)=>{obj.Hour});
        })
      }
      else
      {
        this.categories=[];
          this.data1=[];
          this.data2=[];
        this._siteService.getPowerUsage(data).subscribe((res:any)=>{  
          this.data1=res.Data.map((obj:any) => ({ category: obj.Hour, value1: obj.MaxkW }));
          this.data2=res.Data.map((obj:any) => ({ category: obj.Hour, value2: obj.Charger }));
          this.categories=res.Data.map((obj:any)=>{obj.Hour});
        })
      }
      setInterval( async()=> {this.showSpinner=false;},1000)
  }

  

  onSearch(event:any)
  {
    this.loading=true;
    this.getLastSevenDays()
  }

  getUnitCount()
  {
    this.loading=true;
    this._siteService.getUnitCount(this.selectedSite).subscribe((res:any)=>{
      this.onlineCount=res.Data[0].onlineCount;
      this.offlineCount=res.Data[0].offlineCount;
      this.unitCounts= [
        { category: 'Online', value: res.Data[0].onlineCount },
        { category: 'Offline', value: res.Data[0].offlineCount },
      ];
      this.labelContent = this.labelContent.bind(this);

    })
    this.loading=false
  }

  getFaultCodeByCharger()
  {
    this.faultCodesByCharger=[];
    this._siteService.getFaultCodeByCharger(this.selectedSite).subscribe((res:any)=>{
      this.faultCodesByCharger=res.Data
      this.showCharger = res.Data.length > 0 ? true :false
      this.loading=false;
    })
  }

  getFaultCodeByFaultCode()
  {
    this.faultCodes=[];
    this._siteService.getFaultCodeByFaultCode(this.selectedSite).subscribe((res:any)=>{
      this.faultCodes=res.Data;
      this.showFault = res.Data.length > 0 ? true :false
      this.loading=false;
      this.showFaultCode=false;
    })
  }

  labelContent(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.value}`;
  }

  getPowerUsage()
  {
    this.showSpinner=true;
    this.data1=[];
    this.data2=[];
    this.categories=[];
    const data={
      SiteID:this.selectedSite,
      date:this.currentDate
    }
    this._siteService.getPowerUsage(data).subscribe((res:any)=>{  
      
    this.data1=res.Data.map((obj:any) => ({ category: obj.Hour, value1: obj.MaxkW }));
    this.data2=res.Data.map((obj:any) => ({ category: obj.Hour, value2: obj.Charger }));
    this.categories=res.Data.map((obj:any)=>{obj.Hour});
      this.showSpinner=false;
    })
  }

  
}