import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';

  @ViewChild('footer') footerEl: ElementRef | undefined;
  footerHeight: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Získání skutečné výšky footeru
    // @ts-ignore
    this.footerHeight = this.footerEl.nativeElement.offsetHeight;
    this.cdr.detectChanges();
  }

}
