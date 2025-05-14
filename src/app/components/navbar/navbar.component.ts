// navbar.component.ts
import {Component, ElementRef, HostListener} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {NgClass} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {TranslationService} from '../../services/translation.service';

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
  isLanguageDropdownOpen = false;

  constructor(
    private themeService: ThemeService,
    protected translationService: TranslationService,
    private elementRef: ElementRef
  ) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Zavřeme dropdown menu při přepnutí mobilního menu
    if (this.isLanguageDropdownOpen) {
      this.isLanguageDropdownOpen = false;
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // Metoda pro přepnutí zobrazení dropdown menu jazyků
  toggleLanguageDropdown(event: Event) {
    event.preventDefault();
    event.stopPropagation(); // Zastaví propagaci události do dokumentu
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  // Metoda pro výběr jazyka
  selectLanguage(lang: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log('Selecting language:', lang, 'Current:', this.translationService.getCurrentLang());

    if (this.translationService.getCurrentLang() !== lang) {
      // Pokud máš metodu setLanguage v service
      if (typeof this.translationService.setLanguage === 'function') {
        console.log('Using setLanguage method');
        this.translationService.setLanguage(lang);
      } else {
        // Fallback na switchLang
        console.log('Using switchLang method');
        this.translationService.switchLang();
      }
    }

    this.isLanguageDropdownOpen = false; // Zavřeme dropdown
  }

  // Posluchač pro kliknutí mimo dropdown
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Kontrola, zda kliknutí bylo mimo dropdown
    const dropdown = this.elementRef.nativeElement.querySelector('.language-dropdown');
    if (this.isLanguageDropdownOpen && dropdown && !dropdown.contains(event.target)) {
      console.log('Closing dropdown on external click');
      this.isLanguageDropdownOpen = false;
    }
  }

  get iconClass() {
    return this.themeService.getTheme() === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  get switchLangLabel() {
    return this.translationService.getCurrentLang() === 'cs'
      ? this.translationService.translate("NAVBAR.SWITCH_LANGUAGE_ENGLISH")
      : this.translationService.translate("NAVBAR.SWITCH_LANGUAGE_CZECH");
  }

  get label() {
    return this.themeService.getTheme() === 'dark'
      ? this.translationService.translate("NAVBAR.SWITCH_THEME_LIGHT")
      : this.translationService.translate("NAVBAR.SWITCH_THEME_DARK");
  }
}
