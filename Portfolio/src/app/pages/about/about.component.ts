import { Component } from '@angular/core';
import {TranslatePipe} from '../../pipes/translate.pipe';

@Component({
  selector: 'app-about',
  imports: [
    TranslatePipe
  ],
  templateUrl: './about.component.html',
  standalone: true,
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
