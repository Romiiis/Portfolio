import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [key: string]: any } = {};
  private currentLangSubject = new BehaviorSubject<string>('cs');
  public currentLang$ = this.currentLangSubject.asObservable();

  constructor(private http: HttpClient) {
    // Zkontroluje localStorage a nastaví výchozí jazyk, pokud není nastaven
    const savedLang = localStorage.getItem('preferredLanguage');

    if (savedLang === 'cs' || savedLang === 'en') {
      this.currentLangSubject.next(savedLang);
    } else {
      // Nastaví výchozí jazyk do localStorage
      localStorage.setItem('preferredLanguage', 'cs');
    }

    // Načtení aktuálního jazyka
    this.loadTranslations(this.currentLangSubject.value)
      .subscribe({
        next: (data) => {
          console.log('Překlady úspěšně načteny');
        },
        error: (error) => {
          console.error('Chyba při načítání překladů:', error);
        }
      });
  }

  /**
   * Změna jazyka a načtení příslušných překladů
   */
  setLanguage(lang: 'cs' | 'en'): void {
    this.loadTranslations(lang)
      .subscribe({
        next: () => {
          this.currentLangSubject.next(lang);
          localStorage.setItem('preferredLanguage', lang);
        },
        error: (error) => {
          console.error(`Chyba při změně jazyka na ${lang}:`, error);
        }
      });
  }

  /**
   * Získání aktuálního jazyka
   */
  getCurrentLang(): string {
    return this.currentLangSubject.value;
  }

  /**
   * Načtení souboru s překlady
   */
  private loadTranslations(lang: string): Observable<any> {
    return this.http.get<any>(`/assets/i18n/${lang}.json`).pipe(
      tap(translations => {
        this.translations = translations;
      })
    );
  }

  /**
   * Získání překladu podle klíče
   */
  translate(key: string): string {
    const translation = this.getNestedTranslation(key, this.translations);
    if (!translation) {
      // Vrátí původní klíč, pokud překlad není nalezen
      return key;
    }
    return translation;
  }

  /**
   * Podpora pro vnořené klíče (např. 'NAVBAR.HOME')
   */
  private getNestedTranslation(key: string, translations: any): string {
    if (!key) return '';

    const keys = key.split('.');
    let result = translations;

    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return '';
      }
    }

    return typeof result === 'string' ? result : '';
  }

  switchLang() {
    const currentLang = this.currentLangSubject.value;
    const newLang = currentLang === 'cs' ? 'en' : 'cs';
    this.setLanguage(newLang);

  }
}
