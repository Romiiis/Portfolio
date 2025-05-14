import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})


/**
 * TranslationService is responsible for managing translations in the application.
 * It uses the TranslateService from @ngx-translate/core to handle language switching and translation.
 */
export class TranslationService {

  /**
   * Constructor for the TranslationService.
   * It initializes the TranslateService and sets the default language.
   * @param translateS The TranslateService instance to manage translations.
   */
  constructor(private translateS: TranslateService) {
  }

  /**
   * Gets the current language of the application.
   */
  getCurrentLang(): string {
    return this.translateS.currentLang;
  }

  /**
   * Switches the language of the application between English and Czech.
   */
  switchLang() {
    const currentLang = this.translateS.currentLang;
    const newLang = currentLang === 'en' ? 'cs' : 'en';
    this.translateS.use(newLang);
  }

  /**
   * Translates a given key using the TranslateService.
   * @param key The translation key to be translated.
   * @returns The translated string or the key itself if translation fails.
   */
  translate(key: string): string {
    let result = '';
    this.translateS.get(key).subscribe((res: string) => {
      result = res;
    });
    return result || key;
  }
}
