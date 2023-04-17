import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';  
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SiteService {
  baseUrl: string = "http://localhost:8080/";
  constructor(private http: HttpClient) { }
  private selectedSite: any = '';

  private updateSiteID = new BehaviorSubject('');
  updatedSiteId = this.updateSiteID.asObservable();



  changeSite(siteId:string) {
  this.selectedSite = siteId;
  console.log('siteId',siteId)
      this.updateSiteID.next(siteId);
  }
  getselectedSite(){
    console.log('this.selectedSite func',this.selectedSite)
    return this.selectedSite;
  }

  getAllSites( companyId:any): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}api/Site/getSiteByCompany/${companyId}`
    );
}
getAllDept( siteId:any): Observable<any> {
  return this.http.post<any>(
    `${this.baseUrl}api/Department/getDepartmentBySiteId`,
    {
      "siteId":[siteId]
    }
  );
}

}
