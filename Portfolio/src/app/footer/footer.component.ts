import { Component } from '@angular/core';
import {FaIconComponent, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {faDiscord, faGithub, faInstagram, faSpotify} from '@fortawesome/free-brands-svg-icons';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(library: FaIconLibrary) {
    // Add the icons to the library
    library.addIcons(faInstagram, faGithub, faDiscord, faSpotify);
  }

  protected readonly faHeart = faHeart;
}
