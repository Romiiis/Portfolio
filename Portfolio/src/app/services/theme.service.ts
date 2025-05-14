// theme.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme: 'light' | 'dark' = 'light';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initTheme();
  }

  initTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Načtení tématu z localStorage
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';

      // Použití preferovaného barevného schématu systému jako fallback
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Nastavení tématu
      this.theme = savedTheme || (prefersDark ? 'dark' : 'light');

      // Aplikace tématu
      this.applyTheme();
    }
  }

  getTheme(): string {
    return this.theme;
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  private applyTheme(): void {
    const classList = this.document.documentElement.classList;

    if (this.theme === 'dark') {
      classList.add('dark-theme');
      classList.remove('light-theme');
    } else {
      classList.add('light-theme');
      classList.remove('dark-theme');
    }

    // Uložení tématu do localStorage
    localStorage.setItem('theme', this.theme);
  }
}
