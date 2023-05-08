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
  date:any;
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
  title: string='By Charger';
  faultCodes: any=[];
  showFaultCode: boolean=false;
  selectedCompany:any;

  constructor(
    private datePipe: DatePipe,
    private _siteService:SiteService
    ) { 
      this.loading=true;
      this._siteService.updatedCompanyId.subscribe((res: any) => {
        this.selectedCompany = this._siteService.getselectedCompany();
      })
      this._siteService.updatedSiteId.subscribe((res: any) => {
        this.selectedSite = this._siteService.getselectedSite();
        if(this.selectedSite != '')
        {
          this.loading=true;
          this.showFaultCode=true;
          this.getUnitCount();
          this.getFaultCodeByCharger();
          this.getPowerUsage();
        }
      })
      
    }
   

  ngOnInit() {
    this.currentDate = new Date();
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getLastSevenDays(); 
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

   onChangeStart(value: Date): void {
   
    let x=new Date(value);
    const year=x.getFullYear();
    const month=x.getMonth();
    const day=x.getDate();
    this.startDate=`${year}-${month}-${day}`
   
  }

  onChangeDate(event: any): void 
  {
    this.showSpinner=true;
    let today=new Date(event.target.value);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.endDate=`${year}-${month}-${day}`;
    const data={
      SiteID:this.selectedSite,
      date:this.endDate
    }
    this._siteService.getPowerUsage(data).subscribe((res:any)=>{
      this.data1=res[0].Data.map((obj:any) => ({ category: obj.Hour, value1: obj.MaxkW }));
      this.data2=res[0].Data.map((obj:any) => ({ category: obj.Hour, value2: obj.Charger }));
      this.categories=res[0].Data.map((obj:any)=>{obj.Hour});
      setInterval( async()=> {this.showSpinner=false;},800)
    })
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
      this.onlineCount=res[0].Data[0].onlineCount;
      this.offlineCount=res[0].Data[0].offlineCount;
      this.unitCounts= [
        { category: 'Online', value: res[0].Data[0].onlineCount },
        { category: 'Offline', value: res[0].Data[0].offlineCount },
      ];
      this.labelContent = this.labelContent.bind(this);

    })
    this.loading=false
  }

  getFaultCodeByCharger()
  {
    this._siteService.getFaultCodeByCharger('BD1D9592-F490-ED11-AA20-02E21D877817').subscribe((res:any)=>{
      this.faultCodes=res[0].Data
      this.loading=false;
      this.showFaultCode=false;
    })
  }

  getFaultCodeByFaultCode()
  {
    this._siteService.getFaultCodeByFaultCode('BD1D9592-F490-ED11-AA20-02E21D877817').subscribe((res:any)=>{
      this.faultCodes=res[0].Data;
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
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const data={
      SiteID:this.selectedSite,
      date:formattedDate
    }
    this._siteService.getPowerUsage(data).subscribe((res:any)=>{  
      const timezoneOffset = new Date().getTimezoneOffset();

      for (const element of res[0].Data) 
      {
        const utcDate = new Date(element.Hour);
        const localTime = utcDate.getTime() - timezoneOffset * 60 * 1000;
        const localDate = new Date(localTime);

        const h = localDate.getHours();
        const hours = h.toString().padStart(2, '0') + ':00';

        this.categories.push(hours);
        this.data1.push({ category: hours, value1: element.MaxkW });
        this.data2.push({ category: hours, value2: element.Charger });
      }
      setInterval( async()=> {this.showSpinner=false;},800)
    })
  }

  onToggle(event:any)
  {
    this.showFaultCode=true;
    if(event.target.checked == false)
    {
      this.title='By Fault Code';
      this.getFaultCodeByFaultCode();
    }
    else
    {
      this.title='By Charger';
      this.getFaultCodeByCharger();
    }
  }
}