import { Component, HostListener,OnInit } from '@angular/core';
import { SiteService } from 'src/app/shared/services/site.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
beforeUnloadHandler(event) {
  localStorage.removeItem('companyID');
  localStorage.removeItem('companyName');
  localStorage.removeItem('siteID');
  localStorage.removeItem('siteName')
}

  public listItems: any = [];
  public deptList: any = [];
  public companyItems: any = [];
  public companyList: any = [];
  selectedCompany: any;
  showCompany:boolean=false;
  showSites:boolean=false;
  selectedOption: string='';
  selectDeptOption:string=''
  showSiteList: boolean;
  showCompanyList: boolean;
  constructor(
    private _siteService: SiteService,
  ) 
  {
    this.selectedOption = localStorage.getItem('companyName') != null ? localStorage.getItem('companyName') :'';
    this.selectDeptOption = localStorage.getItem('siteName') != null ? localStorage.getItem('siteName') :''
  }


  ngOnInit() {
    this.getAllCompany();
  }

getAllSites(data:any) {
  this.listItems=[];
  this.deptList=[];
  this._siteService.getAllSites(data).subscribe((res:any)=>{
    this.showSiteList=res.Data.length > 0 ? true:false;
    res.Data.forEach((element:any) => {
      const object={
        ID:element.ID,
        Name:element.Name
      }
      this.listItems.push(object);
      this.deptList.push(object)
    });
  })
}

getAllCompany()
{
  this.companyList=[];
  this.companyItems=[];
  this._siteService.getAllCompany().subscribe((res:any)=>{
    this.showCompanyList=res.Data.length > 0 ? true:false;
    res.Data.forEach(element => {
      const object={
        ID:element.ID,
        Name:element.Name
      }
      this.companyItems.push(object);
      this.companyList.push(object)
    })
  })
}
onChangeSite(value:any) 
{
  this.selectDeptOption=value
  const x=this.deptList.find((s:any) => s.Name === value);
  this._siteService.changeSite(x.ID);
  localStorage.setItem('siteID',x.ID);
  localStorage.setItem('siteName',x.Name)
}

onChangeCompany(value:string)
{
  this._siteService.changeSite('');
  this.selectedOption=value;
  this.selectDeptOption='';
  const x=this.companyList.find((s:any) => s.Name === value);
  this.selectedCompany=x.ID;
  this._siteService.changeCompany(x.ID);
  localStorage.setItem('companyID',x.ID)
  localStorage.setItem('companyName',x.Name)
  this.getAllSites(this.selectedCompany)

}

onSearch(value:any)
{
  if (value.length > 0) 
  {
    const filteredData = this.companyList.filter((item:any) => {
      const regex = new RegExp(value, "i");
      return regex.test(item.Name);
    });
    this.companyItems=filteredData
    
  }
   else 
  {
    this.getAllCompany();
    this.selectDeptOption='';
  }
}

onSearchSite(value:any)
{
  if (value.length > 0) {
    const filteredData = this.deptList.filter((item:any) => {
      const regex = new RegExp(value, "i");
      return regex.test(item.Name);
    });
    this.listItems=filteredData
    
  }
   else {
    this.getAllSites(this.selectedCompany)
  }
}


}
