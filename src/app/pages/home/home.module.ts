import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HomeComponent } from './home.component';
import { CarouselComponent } from './components/carousel/carousel.component';



@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,

  ],
  imports: [
    CommonModule,
    CarouselModule
  ]
})
export class HomeModule { }
