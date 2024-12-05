import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkModeSignal = signal<string>(
    JSON.parse(window.localStorage.getItem('darkMode') || 'null')
  );

  constructor() {
    effect(()=>{
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkModeSignal()));
    });
  }

  updateDarkMode() {
    this.darkModeSignal.update((mode) => {
      console.log('mode :>> ', mode);

      if (mode === 'dark') {
        return 'null';
      } else {
        return 'dark';
      }
    });
  }
}
