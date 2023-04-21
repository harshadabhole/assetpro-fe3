import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [  
    HeaderComponent,
    HomeComponent,
    SideNavComponent,
    DashboardComponent,
    SpinnerComponent,
    MapComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ]
})
export class DashboardModule { }
