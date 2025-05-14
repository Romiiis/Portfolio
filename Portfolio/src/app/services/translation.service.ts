// translation.service.ts
import { Injectable, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private languageChange = new EventEmitter<string>();
  private LANG_STORAGE_KEY = 'app_preferred_language';

  constructor(private translateS: TranslateService) {
    // Načtení uloženého jazyka z localStorage nebo použití výchozího
    const savedLang = this.getSavedLanguage();

    // Nastavení defaultního jazyka a použití uloženého/výchozího
    this.translateS.setDefaultLang('en');
    this.translateS.use(savedLang);

    // Emitování události změny jazyka při inicializaci
    this.languageChange.emit(savedLang);

    console.log('TranslationService initialized with language:', savedLang);
  }

  /**
   * Získá uložený jazyk z localStorage nebo vrátí výchozí jazyk
   */
  private getSavedLanguage(): string {
    const savedLang = localStorage.getItem(this.LANG_STORAGE_KEY);

    // Zkontrolujeme, zda je uložený jazyk platný (en/cs)
    if (savedLang && (savedLang === 'en' || savedLang === 'cs')) {
      console.log('Loaded language from localStorage:', savedLang);
      return savedLang;
    }

    // Jinak zkusíme detekovat jazyk prohlížeče
    const browserLang = this.translateS.getBrowserLang();
    const defaultLang = browserLang && browserLang.match(/en|cs/) ? browserLang : 'en';
    console.log('Using browser/default language:', defaultLang);
    return defaultLang;
  }

  /**
   * Nastaví určitý jazyk
   */
  setLanguage(lang: string): void {
    if (lang !== this.getCurrentLang()) {
      console.log('Setting language to:', lang);
      this.translateS.use(lang);
      this.saveLanguage(lang);
      this.languageChange.emit(lang);
    }
  }

  /**
   * Uloží vybraný jazyk do localStorage
   */
  private saveLanguage(lang: string): void {
    localStorage.setItem(this.LANG_STORAGE_KEY, lang);
    console.log('Saved language to localStorage:', lang);
  }

  /**
   * Vrátí aktuální jazyk
   */
  getCurrentLang(): string {
    return this.translateS.currentLang || this.translateS.defaultLang || 'en';
  }

  /**
   * Přepne mezi jazyky a uloží nastavení
   */
  switchLang() {
    const currentLang = this.getCurrentLang();
    const newLang = currentLang === 'en' ? 'cs' : 'en';

    console.log('Switching language from', currentLang, 'to', newLang);

    // Nastavení nového jazyka
    this.translateS.use(newLang);

    // Uložení do localStorage
    this.saveLanguage(newLang);

    // Emituj událost změny jazyka
    this.languageChange.emit(newLang);
  }

  /**
   * Přeloží klíč do aktuálního jazyka
   */
  translate(key: string): string {
    let result = '';
    this.translateS.get(key).subscribe((res: string) => {
      result = res;
    });
    return result || key;
  }

  /**
   * Naslouchá změnám jazyka
   */
  onLanguageChange(): Observable<string> {
    return this.languageChange.asObservable();
  }
}
