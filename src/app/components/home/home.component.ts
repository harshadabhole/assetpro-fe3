import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/shared/services/site.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedSite: any;
  selectedCompany: any;
  
  constructor( private _siteService: SiteService,) 
  {
    this._siteService.updatedCompanyId.subscribe((res: any) => {
      this.selectedCompany = this._siteService.getselectedCompany();
    })
    this._siteService.updatedSiteId.subscribe((res: any) => {
      this.selectedSite = this._siteService.getselectedSite();
    })
    
   }

  ngOnInit() {
   
  }
 
}
