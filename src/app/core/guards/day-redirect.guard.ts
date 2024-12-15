import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DayRedirectGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Додаємо 0 до місяців < 10
    const day = String(today.getDate()).padStart(2, '0'); // Додаємо 0 до днів < 10
    this.router.navigate([`/tasks/day/${year}/${month}/${day}`]);
    return false; // Забороняємо доступ до початкового `day/`
  }
}
