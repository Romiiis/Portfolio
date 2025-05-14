import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})

/**
 * Service for managing the theme of the application.
 * It allows toggling between light and dark themes and saves the user's preference in localStorage.
 * It also applies the theme to the document's class list.
 */
export class ThemeService {

  /**
   * The current theme of the application.
   * Can be either 'light' or 'dark'.
   */
  private theme: 'light' | 'dark' = 'light';

  /**
   * Constructor for the ThemeService.
   * It initializes the theme based on the user's preference or system preference.
   * @param document The document object to manipulate the DOM.
   * @param platformId The platform ID to check if the code is running in a browser.
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initTheme();
  }

  /**
   * Initializes the theme based on the user's preference stored in localStorage or the system preference.
   * It applies the theme to the document's class list.
   */
  initTheme(): void {
    if (isPlatformBrowser(this.platformId)) {

      // Load the saved theme from localStorage
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';

      // Check if the user has a saved theme in localStorage
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Set the theme based on the saved theme or system preference
      this.theme = savedTheme || (prefersDark ? 'dark' : 'light');

      // Apply the theme to the document
      this.applyTheme();
    }
  }

  /**
   * Gets the current theme of the application.
   * @returns The current theme ('light' or 'dark').
   */
  getTheme(): string {
    return this.theme;
  }

  /**
   * Toggles the theme between light and dark.
   * It updates the theme property and applies the new theme to the document's class list.
   */
  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  /**
   * Applies the current theme to the document's class list.
   * It adds or removes the appropriate classes based on the current theme.
   */
  private applyTheme(): void {
    const classList = this.document.documentElement.classList;

    if (this.theme === 'dark') {
      classList.add('dark-theme');
      classList.remove('light-theme');
    } else {
      classList.add('light-theme');
      classList.remove('dark-theme');
    }

    // Save the current theme to localStorage
    localStorage.setItem('theme', this.theme);
  }
}
