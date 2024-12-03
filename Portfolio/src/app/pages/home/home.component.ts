import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBug} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    FaIconComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  protected readonly faBug = faBug;


}
