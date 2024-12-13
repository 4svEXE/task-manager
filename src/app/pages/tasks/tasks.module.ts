import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { DayViewComponent } from './components/day-view/day-view.component';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { MonthViewComponent } from './components/month-view/month-view.component';
import { TasksRoutingModule } from './tasks-routing.module';

import { FormsModule } from '@angular/forms';
import { TaskDisplayComponent } from '../../shared/components/task-display/task-display.component';


@NgModule({
  declarations: [
    TasksComponent,
    DayViewComponent,
    WeekViewComponent,
    MonthViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    TasksRoutingModule,
    FormsModule,
    TaskDisplayComponent
  ]
})
export class TasksModule { }
