import { DateService } from './../../../../core/services/date.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss'],
})
export class DayViewComponent {
  private readonly urlPath = '/tasks/day/';
  private _currentDate!: string; // Локальна змінна для збереження дати
  now!: string;

  constructor(private DateService: DateService) {
    this.updateDateToNow();
    this.now = this.DateService.getCurrentDate('day');
  }

  // Getter для автоматичної реакції Angular на зміни
  get currentDate(): string {
    return this._currentDate.replace(/\//g, '-');
  }

  // Setter для оновлення значення
  set currentDate(value: string) {
    this._currentDate = value;
  }

  // Повертає URL для попереднього дня
  getPreviousDay(): string {
    const previousDate = this.DateService.getpreviousDate('day', this._currentDate);
    return this.urlPath + previousDate;
  }

  // Повертає URL для поточного дня
  getCurrentDay(): string {
    return this.urlPath + this.now;
  }

  // Повертає URL для наступного дня
  getNextDay(): string {
    const nextDate = this.DateService.getNextDate('day', this._currentDate);
    return this.urlPath + nextDate;
  }

  // Оновлює `currentDate` для попереднього дня
  updateToPreviousDay(): void {
    this.currentDate = this.DateService.getpreviousDate('day', this._currentDate);
  }

  // Оновлює `currentDate` для наступного дня
  updateToNextDay(): void {
    this.currentDate = this.DateService.getNextDate('day', this._currentDate);
  }

  // Оновлює `currentDate` для поточного дня
  updateDateToNow(): void {
    this.currentDate = this.DateService.getCurrentDate('day');
    console.log('this.currentDate :>> ', this.currentDate);
  }
}
