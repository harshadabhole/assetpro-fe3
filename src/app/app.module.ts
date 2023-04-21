import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteService } from './shared/services/site.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ReportModule } from './components/report/report.module';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropDownsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    LabelModule,
    InputsModule,
    ButtonsModule,
    NgMultiSelectDropDownModule.forRoot(),
    DashboardModule,
    ReportModule
  ],
  providers: [SiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
