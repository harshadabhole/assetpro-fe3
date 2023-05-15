import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from 'src/app/shared/services/site.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  selectedSite:any;
  selectedMenuItem = 'dashboard';
  constructor(
    private _siteService: SiteService,
    private router: Router
  ) { 
    this._siteService.updatedSiteId.subscribe((res: any) => {
      this.selectedSite = this._siteService.getselectedSite();
    })
  }

  ngOnInit() {
  }

  isSelected(route: string): boolean {
    return this.router.url === route;
  }

}
