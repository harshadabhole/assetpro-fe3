import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/shared/services/site.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public thumbnailSrc =
  "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg";
public cover =
  "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/black_sea.jpg";
  public deptList: Array<string> = [];
  public dropdownList:Array<string> =[];
  public assetList: Array<string> = [];
  public selectAssetList: Array<string> = [];
  public selectDeptList: Array<string> = [];
  selectedSite: any;
  show:boolean=false;
  index: any;
  showDeptSearchbar:boolean=true;
  showAssetSearchbar:boolean=true;
  public listItems: Array<string> = [
    "Baseball",
    "Basketball",
    "Cricket",
    "Field Hockey",
    "Football",
    "Table Tennis",
    "Tennis",
    "Volleyball",
  ];
  public value: any = ["Baseball"];

  // dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  
  constructor( private _siteService: SiteService,) {
    this._siteService.updatedSiteId.subscribe((res: any) => {
      this.selectedSite = this._siteService.getselectedSite();
      console.log('selectedSite',this.selectedSite);
      this.getAllDeptBySiteID();
      this.getAllAssetsBySiteId();
    })
    
   }

  ngOnInit() {
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  
  getAllDeptBySiteID() {
    this._siteService.getAllDept(this.selectedSite).subscribe((res:any)=>{
      console.log("by org res",res);
      res[0].Data.forEach(element => {
        this.deptList.push(element);
        this.dropdownList.push(element.Name )
          console.log('this.dropdownList',this.dropdownList,this.selectedItems)
          
      });
    })
  }

  getAllAssetsBySiteId()
  {
    const object={
     // SiteID:this.selectedSite
      SiteID:'BE87DE7F-5158-48B3-8042-2B47ACF5E785'
    }
    this._siteService.getAllAsset(object).subscribe((response:any)=>{
      console.log("Assets---",response[0].Data)
      this.assetList=response[0].Data
    })
  }

  changeIcon(event:any,value:any,i:any)
  {
    this.index=i;
    this.show=value=='Show'? true :false;
  }

  onSelectDept(data:any)
  {
    console.log("In dept-----",data)
    this.showDeptSearchbar=false;
    
  }

  onSelectAsset(data:any)
  {
    console.log("In ASset----",data)
    console.log("Show--",this.show)
    this.showAssetSearchbar=false;
  }
}
