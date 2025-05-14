import {Component} from '@angular/core';
import {TranslatePipe} from '../../pipes/translate.pipe';


@Component({
  selector: 'app-home',
  imports: [
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
