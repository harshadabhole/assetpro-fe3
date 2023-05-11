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
  private selectedCompany: any = '';

  private updateSiteID = new BehaviorSubject('');
  updatedSiteId = this.updateSiteID.asObservable();

  private updateCompanyID = new BehaviorSubject('');
  updatedCompanyId = this.updateCompanyID.asObservable();


  changeSite(siteId:string) {
  this.selectedSite = siteId;
      this.updateSiteID.next(siteId);
  }
  getselectedSite(){
    return this.selectedSite;
  }

  changeCompany(companyId:string) {
    console.log('IN OBSERVABLE---',companyId)
    this.selectedCompany = companyId;
        this.updateCompanyID.next(companyId);
    }
  getselectedCompany(){
      return this.selectedCompany;
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
      "SiteId":[siteId]
    }
  );
}

getAllCompany():Observable<any>{
  return this.http.get<any>(
    `${this.baseUrl}api/Company/getAllCompany`);
}

getAllAsset(data:any):Observable<any>{
  return this.http.post<any>(
    `${this.baseUrl}api/Asset/getAssetBySiteId`,data);
}

getMaintenanceStatusReport(data:any):Observable<any>{
  return this.http.post<any>(
    `${this.baseUrl}api/Asset/getMaintenanceStatusReport`,data)
}

getUnitCount(siteID:any):Observable<any>{
  return this.http.get<any>(`${this.baseUrl}api/Asset/getUnitCount/${siteID}`)
}

getFaultCodeByCharger(siteID:any):Observable<any>{
  return this.http.get<any>(`${this.baseUrl}api/Asset/getFaultCodeByCharger/${siteID}`)

}

getFaultCodeByFaultCode(siteID:any):Observable<any>{
  return this.http.get<any>(`${this.baseUrl}api/Asset/getFaultCodeByFaultCode/${siteID}`)

}

getPowerUsage(data:any):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}api/Asset/getPowerUsage`,data)
}

getAllMarkers(siteID:any):Observable<any>{
  console.log('siteID', siteID)
  return this.http.get<any>(`${this.baseUrl}api/Asset/getMapDetails/${siteID}`)
  // return this.http.get<any>(`${this.baseUrl}api/Asset/getMapDetails/BD1D9592-F490-ED11-AA20-02E21D877817`)
  

}

}
