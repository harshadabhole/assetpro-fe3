import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/shared/services/site.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public listItems: Array<string> = [];
  constructor(
    private _siteService: SiteService,
  ) { }

  ngOnInit() {
    this.getAllSites();
  }

getAllSites() {
  this._siteService.getAllSites("9A011888-1C60-EB11-AA20-02E21D877817").subscribe((res:any)=>{
    console.log("by org res",res);
    res[0].Data.forEach(element => {
      console.log('element', element.ID);
      this.listItems.push(element.ID)
    });
  })
}
onChange(value) {
  console.log('valuee',value);
  this._siteService.changeSite(value);
}

}
