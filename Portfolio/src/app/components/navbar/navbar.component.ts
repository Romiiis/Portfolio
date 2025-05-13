// navbar.component.ts
import {Component} from '@angular/core';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private themeService: ThemeService) {
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
