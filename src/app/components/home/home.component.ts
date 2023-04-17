import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/shared/services/site.service';

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
  selectedSite: any;

  constructor( private _siteService: SiteService,) {
    this._siteService.updatedSiteId.subscribe((res: any) => {
      this.selectedSite = this._siteService.getselectedSite();
      console.log('selectedSite',this.selectedSite);
      this.getAllDeptBySiteID();

    })
    
   }

  ngOnInit() {

  }

  getAllDeptBySiteID() {
    this._siteService.getAllDept(this.selectedSite).subscribe((res:any)=>{
      console.log("by org res",res);
      res[0].Data.forEach(element => {
        console.log('element', element.ID);
        this.deptList.push(element.ID)
      });
    })
  }
}
