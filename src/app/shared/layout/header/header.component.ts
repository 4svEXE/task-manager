import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { SvgIconsInterface, SvgService } from '../../../core/services/svg.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  svg!: SvgIconsInterface;

  constructor(private SVG:SvgService) {
    this.svg = this.SVG.loadSvg();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
