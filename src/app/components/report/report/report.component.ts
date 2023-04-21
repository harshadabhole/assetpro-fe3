import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SiteService } from 'src/app/shared/services/site.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers:[DatePipe]
})
export class ReportComponent implements OnInit {
  public thumbnailSrc =
  "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg";
public cover =
  "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/black_sea.jpg";
  public deptList: Array<string> = [];
  public assetList: Array<string> = [];
  public selectAssetList: Array<string> = [];
  public selectDeptList: Array<string> = [];
  selectedSite: any;
  show:boolean=false;
  index: any;
  showDeptSearchbar:boolean=true;
  showAssetSearchbar:boolean=true;
  selectedOptions = new FormControl();
  filterAsset: any;
  filterDeptList: any;
  startDate: any;
  endDate:any
  date: any ;
  loading: boolean = false;
  showDateRange: boolean=true;
  departmentID: any;

  constructor( 
    private _siteService: SiteService,
    private datePipe: DatePipe
   ) 
   {
    this.loading=true;
    this._siteService.updatedSiteId.subscribe((res: any) => {
      this.selectedSite = this._siteService.getselectedSite();
      this.getAllDeptBySiteID();
      //this.getAllAssetsBySiteId();
    })
   }

ngOnInit() {
  this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  getAllDeptBySiteID() {
    this.deptList=[];
    this._siteService.getAllDept(this.selectedSite).subscribe((res:any)=>{
      console.log("DEPT----",res[0].Data)
      res[0].Data.forEach(element => {
        this.deptList.push(element)
      });
      this.loading=false;
      this.filterDeptList=this.deptList
    },(err:any)=>{
      this.loading=false;
    })
  }

  getAllAssetsBySiteId(SiteID:any)
  { 
    this.loading = true;
    this.assetList=[];
    const object={
      SiteID:SiteID
      //SiteID:'BE87DE7F-5158-48B3-8042-2B47ACF5E785'
    }
    console.log("SITE---",this.selectedSite)
    console.log("OBJ---",object)
    this._siteService.getAllAsset(object).subscribe((response:any)=>{
      console.log('Assets---',response)
      this.assetList=response[0].Data
      this.filterAsset=response[0].Data
       this.loading=false;
    },(err:any)=>{
      this.loading=false;
    })
   
  }

  changeIcon(value:any,i:any)
  {
    this.index=i;
    this.show=value=='Show'? true :false;
  }

  onSelectDept(data:any,value:any)
  {
    console.log("data--",data)
    this.loading = true;
    if(value =='DELETE')
    {
      this.selectDeptList=this.selectDeptList.filter((item:any) => item !== data)
      this.showDeptSearchbar=this.selectDeptList.length > 0?false:true;
      setInterval( async()=> {
        this.loading=false;
      },1000)

    }
    else
    {
      this.selectDeptList.push(data.Name)
      this.departmentID=data.ID
      this.getAllAssetsBySiteId(data.ID)
      this.showDeptSearchbar=false;
      setInterval( async()=> {
        this.loading=false;
      },1000)
    }
   
  }

  onSelectAsset(data:any,value:any)
  {
    this.loading=true;
      if(value=='ADD TYPE')
      {
        const a=`${data.assetstype}/All`
        const s=this.selectAssetList.includes(a)
        if(s==false)
        {
          this.selectAssetList.forEach((element:any)=>{
            const ss=element.split('/')
            if(ss[0]== data.assetstype)
            {
              this.selectAssetList=this.selectAssetList.filter((item:any) => item !== element);
            }
          })
          const d=`${data.assetstype}/All`
          this.selectAssetList.push(d)
          this.showAssetSearchbar=false;
          setInterval( async()=> {
            this.loading=false;
          },1000)
        }
      }
      else if(value=='ADD ASSET')
      {
        const a=`${data.AssetTypeName}/All`
        const s=this.selectAssetList.includes(a)
        if(s== true)
        {
          this.selectAssetList=this.selectAssetList.filter((item:any) => item !== a);
          const d=`${data.AssetTypeName}/${data.Name}`
          this.selectAssetList.push(d)
          this.showAssetSearchbar=false;
          setInterval( async()=> {
            this.loading=false;
          },1000)
        }
        else
        {
          const d=`${data.AssetTypeName}/${data.Name}`
            this.selectAssetList.push(d)
            this.showAssetSearchbar=false;
            setInterval( async()=> {
              this.loading=false;
            },1000)
        }
      }
      else
      {
        this.selectAssetList=this.selectAssetList.filter((item:any) => item !== data)
        this.showAssetSearchbar=this.selectAssetList.length > 0?false:true;
        setInterval( async()=> {
          this.loading=false;
        },1000)
      }
  }

  onAssetChange(value:any)
  {
    if(value.length > 0)
    {
      const filteredData = this.filterAsset.filter((item:any) => {
        const regex = new RegExp(value, "i");
        return regex.test(item.assetstype) || item.assets.some((asset:any) => regex.test(asset.Name));
      });
      this.assetList=filteredData

    }
    else
    {
      this.getAllAssetsBySiteId(this.departmentID);
    }
  }

  onDeptChange(value:any)
  {
    if(value.length > 0)
    {
      const filteredData = this.filterDeptList.filter((item:any) => {
        const regex = new RegExp(value, "i");
        return regex.test(item.Name);
      });
      this.deptList=filteredData
    }
    else
    {
      this.getAllDeptBySiteID()
    }
  }

  selectStartDate(event:any)
  {
    this.startDate=event.target.value
  }

  selectEndDate(event:any)
  {
    this.endDate=event.target.value;
  }

  onClear(value:any)
  {
    this.loading = true;
    if(value == 'Clear')
    {
      this.selectAssetList=[];
      this.selectDeptList=[];
      this.showDeptSearchbar=true;
      this.showAssetSearchbar=true;
      setInterval( async()=> {
        this.loading=false;
      },3000)
    }
    else
    {
      setInterval( async()=> {
        this.loading=false;
      },3000)
    }
  }

  checkDates(event:any)
  {
    this.showDateRange=event.target.checked == false ? false:true;
    this.date= event.target.checked == true ? this.datePipe.transform(new Date(), 'yyyy-MM-dd'):''
  }

}
