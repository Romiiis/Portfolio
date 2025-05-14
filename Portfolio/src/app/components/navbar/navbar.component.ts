// navbar.component.ts
import {Component} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {NgClass} from '@angular/common';
import {TranslatePipe} from '../../pipes/translate.pipe';
import {TranslationService} from '../../services/translation/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    NgClass,
    TranslatePipe
  ],
  standalone: true,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isMobileMenuOpen = false;

  constructor(private themeService: ThemeService, protected translationService: TranslationService) {
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

  get switchLangLabel() {
    return this.translationService.getCurrentLang() === 'cs' ? this.translationService.translate("NAVBAR.SWITCH_LANGUAGE_ENGLISH") : this.translationService.translate("NAVBAR.SWITCH_LANGUAGE_CZECH");
  }

  get label() {
    return this.themeService.getTheme() === 'dark' ? this.translationService.translate("NAVBAR.SWITCH_THEME_LIGHT") : this.translationService.translate("NAVBAR.SWITCH_THEME_DARK");
  }
}
