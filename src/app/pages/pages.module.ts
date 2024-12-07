import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { PagesRoutingModule } from './pages-routing.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeModule, PagesRoutingModule, TasksModule],
})
export class PagesModule {}
