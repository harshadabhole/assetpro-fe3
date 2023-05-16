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
  assetNameList:any=[];
  assetIDList:any=[];
  assetDetails:any=[];
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
    })
   }

ngOnInit() {
  this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  getAllDeptBySiteID() {
    this.deptList=[];
    this.assetList=[];
    this.selectAssetList=[];
    this.selectDeptList=[];
    this.assetDetails=[];
    this.filterAsset=[];
    this.filterDeptList=[];
    this.showAssetSearchbar=true;
    this.showDeptSearchbar=true;
    this._siteService.getAllDept(this.selectedSite).subscribe((res:any)=>{
      res.Data.forEach(element => {
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
    }
    
    this._siteService.getAllAsset(object).subscribe((response:any)=>{
      console.log('Assets---',response)
      this.assetList=response.Data
      this.filterAsset=response.Data
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
      this.loading=false;

    }
    else
    {
      this.selectDeptList.push(data.Name)
      this.departmentID=data.ID
      this.getAllAssetsBySiteId(data.ID)
      this.showDeptSearchbar=false;
      this.loading=false;
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

          this.assetDetails = this.assetDetails.filter((obj:any) => obj.AssetTypeName !== data.assetstype);
          const d=`${data.assetstype}/All`
          this.selectAssetList.push(d)
          this.showAssetSearchbar=false;
          data.assets.forEach((item:any)=>{
            const assetDetails={
              ID:item.ID,
              Name:item.Name,
              AssetTypeName:item.AssetTypeName
            }
            this.assetDetails.push(assetDetails)
          })
          this.loading=false;
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
          this.assetDetails = this.assetDetails.filter((obj:any) => obj.AssetTypeName !== data.AssetTypeName);
          const assetDetails={
            ID:data.ID,
            Name:data.Name,
            AssetTypeName:data.AssetTypeName
          }
          this.assetDetails.push(assetDetails)
          this.loading=false;
        }
        else
        {
          const d=`${data.AssetTypeName}/${data.Name}`
            this.selectAssetList.push(d)
            this.showAssetSearchbar=false;
            const assetDetails={
              ID:data.ID,
              Name:data.Name,
              AssetTypeName:data.AssetTypeName
            }
            this.assetDetails.push(assetDetails)
            this.loading=false;
        }
        this.loading=false;
      }
      else
      {
        this.selectAssetList=this.selectAssetList.filter((item:any) => item !== data)
        this.showAssetSearchbar=this.selectAssetList.length > 0?false:true;
        const x=data.split("/")
        this.assetDetails = this.assetDetails.filter((obj:any) => obj.AssetTypeName !== x[0]);
        this.loading=false;
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
      this.assetDetails=[];
      this.assetList=[];
      this.show=false;
      localStorage.removeItem('maintenanceStatusReport');
      localStorage.removeItem('assetName');
      this.loading=false;
    }
    else
    {
      this.assetDetails.forEach((element:any)=>{
        this.assetIDList.push(element.ID)
        this.assetNameList.push(element.Name)
      })
      const object={
        assetID:this.assetIDList,
        assetName:this.assetNameList,
        SiteID:this.selectedSite
      }
      this._siteService.getMaintenanceStatusReport(object).subscribe((res:any)=>{
        localStorage.setItem('assetName',JSON.stringify(this.assetNameList));
        localStorage.setItem('maintenanceStatusReport',JSON.stringify(res.Data[0]));
        window.open('/maintenance-report', '_blank');
        this.loading=false;
      })
    }
  }

  checkDates(event:any)
  {
    this.showDateRange=event.target.checked == false ? false:true;
    this.date= event.target.checked == true ? this.datePipe.transform(new Date(), 'yyyy-MM-dd'):''
  }

}
