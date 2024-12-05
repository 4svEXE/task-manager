import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { svgIcons } from '../../shared/svg';

@Injectable({
  providedIn: 'root',
})
export class SvgService {
  private sanitizer = inject(DomSanitizer);

  loadSvg(): SvgIconsInterface {
    const safeSvgCodes: SvgIconsInterface = {};

    Object.keys(svgIcons).forEach((key) => {
      safeSvgCodes[key] = this.sanitizer.bypassSecurityTrustHtml(svgIcons[key]);
    });

    return safeSvgCodes;
  }
}

export interface SvgIconsInterface {
  [key: string]: SafeHtml;
}
