import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayViewComponent } from './components/day-view/day-view.component';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { MonthViewComponent } from './components/month-view/month-view.component';
import { TasksComponent } from './tasks.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      { path: '', redirectTo: 'day', pathMatch: 'full' }, // Редірект з /tasks на /tasks/day
      { path: 'day', component: DayViewComponent },
      { path: 'week', component: WeekViewComponent },
      { path: 'month', component: MonthViewComponent },
    ],
  },
  { path: '**', redirectTo: 'day', pathMatch: 'full' }, // Глобальний редірект
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
