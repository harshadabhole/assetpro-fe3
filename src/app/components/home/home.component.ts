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
  selectedCompany: any;
  
  constructor( private _siteService: SiteService,) 
  {
    this._siteService.updatedCompanyId.subscribe((res: any) => {
      this.selectedCompany = this._siteService.getselectedCompany();
    })
    this._siteService.updatedSiteId.subscribe((res: any) => {
      this.selectedSite = this._siteService.getselectedSite();
      console.log('selectedSite',this.selectedSite);
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
 
}
