import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowReportsComponent } from './show-reports/show-reports.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

@NgModule({
  declarations: [ReportComponent, ShowReportsComponent,],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    SharedModule,
    ChartsModule,
  ]
})
export class ReportModule { }
