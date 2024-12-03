import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faTerminal, faGlobe } from '@fortawesome/free-solid-svg-icons';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslationService} from '../services/translation.service';
import {NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    TranslatePipe,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faIcon = faTerminal;

  faGlobe = faGlobe;
  constructor(private translationService: TranslationService) {}

  get currentLanguage(): string {
    return localStorage.getItem('lng') || 'en';
  }

  switchLanguage(lang: string) {
    this.translationService.changeLang(lang);
  }


}
