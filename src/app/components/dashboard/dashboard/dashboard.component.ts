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
  categories:any;
  clickedDate: any;
  data1:any=[];
  data2:any=[];
  isClicked:boolean=false;
  loading:boolean=false;
  onlineCount:any=0;
  offlineCount:any=0;
  value1=5;
  value2=15;
  faultCodeByCharger: any=0;
  faultCodeByFaultCode: any=0;
  unitCounts: any=[];
  title: any;
  
  constructor(
    private datePipe: DatePipe,
    private _siteService:SiteService
    ) { 
      this.loading=true;
      this._siteService.updatedSiteId.subscribe((res: any) => {
        this.selectedSite = this._siteService.getselectedSite();
        this.getUnitCount();
        this.getFaultCodeByCharger();
      })
    }
   

  ngOnInit() {
    this.currentDate = new Date();
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.title='By Charger'
    this.getLastSevenDays();
    this.categories=['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','12:00','13:00','14:00','15:00','16:00', '17:00', '18:00', '19:00','20:00','21:00','22:00','23:00'];
    this.data1=[
      { category: '00:00', value1: 0},
      { category: '01:00', value1: 0},
      { category: '02:00', value1: 1},
      { category: '03:00', value1: 10},
      { category: '04:00', value1: 13},
      { category: '05:00', value1: 9},
      { category: '06:00', value1: 10},
      { category: '07:00', value1: 5},
      { category: '08:00', value1: 0},
      { category: '09:00', value1: 4},
      { category: '10:00', value1: 19},
      { category: '11:00', value1: 17},
      { category: '12:00', value1: 15},
      { category: '13:00', value1: 20},
      { category: '14:00', value1: 4},
      { category: '15:00', value1: 15},
      { category: '16:00', value1: 5 },
      { category: '17:00', value1: 10 },
      { category: '18:00', value1: 15 },
      { category: '19:00', value1: 25.8 },
      { category: '20:00', value1: 13},
      { category: '21:00', value1: 10},
      { category: '22:00', value1: 15},
      { category: '23:00', value1: 8},
    ];
    this.data2=[
      { category: '00:00', value2: 5},
      { category: '04:00', value2: 8},
      { category: '10:00', value2: 20},
      { category: '13:00', value2: 25},
      { category: '16:00', value2: 4 },
      { category: '17:00', value2: 6 },
      { category: '18:00', value2: 8 },
      { category: '19:00', value2: 10 },
      { category: '20:00', value2: 13.5}
    ];
    
    this.label=`${this.offlineCount} offline`;
     this.label1=`Fault Code By Charger ${this.faultCodeByCharger}`;
    // this.label2=`Chargers ${this.value2}/${ this.scaleSettings2.max}`
  }

  getLastSevenDays()
  {
   // this.loading=true;
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
   // this.loading=false;
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

  onChangeEnd(value: Date): void {
    let x=new Date(value);
    const year=x.getFullYear();
    const month=x.getMonth();
    const day=x.getDate();
    this.endDate=`${year}-${month}-${day}`;
    console.log("EndDate---",this.endDate)
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
     // console.log("COUNTS----",this.onlineCount, this.offlineCount)
      this.label=`${this.offlineCount} offline`;
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
    this._siteService.getFaultCodeByCharger(this.selectedSite).subscribe((res:any)=>{
      console.log("Response----",res[0].Data)
      this.faultCodeByCharger=res[0].Data[0].TotalCount
      this.loading=false;
    })
  }

  labelContent(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.value}`;
  }
  
  changeFaultCode(event:any)
  {
    console.log("Value--",event.target.checked)
    this.title= event.target.checked== true?'By Fault Code':'By Charger'
  }

}
