import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { ShowReportsComponent } from './show-reports/show-reports.component';

const routes: Routes = [ 
  {path : '', component : ReportComponent},
  {path : 'maintenance-report', component:ShowReportsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
