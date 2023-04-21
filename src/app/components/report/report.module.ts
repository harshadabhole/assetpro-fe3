import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
// import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@NgModule({
  declarations: [ReportComponent,
    ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
  ]
})
export class ReportModule { }
