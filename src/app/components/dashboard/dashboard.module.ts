import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { LabelModule } from '@progress/kendo-angular-label';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import 'hammerjs';

@NgModule({
  declarations: [  
    HeaderComponent,
    HomeComponent,
    SideNavComponent,
    DashboardComponent,
    MapComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    ChartsModule,
    DateInputsModule,
    GaugesModule,
    LayoutModule,
    ProgressBarModule,
    LabelModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ]
})
export class DashboardModule { }
