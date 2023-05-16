import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { HomeComponent } from './components/home/home.component';
import { ReportModule } from './components/report/report.module';

const routes: Routes = [ 
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: HomeComponent, loadChildren: ()=>DashboardModule },
{ path: 'report', component: HomeComponent, loadChildren: ()=>ReportModule },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
