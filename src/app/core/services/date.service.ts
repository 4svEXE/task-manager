import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  transfornDatePipe(date: number[], arg: DateType): string {
    const [year, month, day] = date;
    // return `${year}/${month}/${day}`;

    return arg === 'year'
      ? year + '/'
      : arg === 'month'
      ? year + '/' + month
      : year + '/' + month + '/' + day;
  }

  parseDate(date: string): number[] {
    const [year, month, day] = date.split('/');
    return [+year, +month, +day];
  }

  getCurrentDate(arg: DateType): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    return this.transfornDatePipe([year, month, day], arg);
  }

  getpreviousDate(arg: DateType, currentDate: string): string {
    const [year, month, day] = this.parseDate(currentDate);

    const previousDate = new Date(+year, +month - 1, +day - 1);

    return this.transfornDatePipe(
      [
        previousDate.getFullYear(),
        previousDate.getMonth() + 1,
        previousDate.getDate(),
      ],
      arg
    );
  }

  getNextDate(arg: DateType, currentDate: string): string {
    const [year, month, day] = this.parseDate(currentDate);
    const nextDate = new Date(+year, +month - 1, +day + 1);
    return this.transfornDatePipe(
      [
        nextDate.getFullYear(),
        nextDate.getMonth() + 1,
        nextDate.getDate(),
      ],
      arg
    );
  }
}

type DateType = 'day' | 'month' | 'year';
