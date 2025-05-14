// navbar.component.ts
import {Component} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    NgClass
  ],
  standalone: true,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isMobileMenuOpen = false;

  constructor(private themeService: ThemeService) {
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get iconClass() {
    return this.themeService.getTheme() === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  get label() {
    return `Switch to ${this.themeService.getTheme() === 'dark' ? 'light' : 'dark'} mode`;
  }
}
