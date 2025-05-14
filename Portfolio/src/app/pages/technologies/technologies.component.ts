import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {TechnologyCategory} from '../../model/TechnologyCategory';
import {TechnologiesService} from '../../services/technologies.service';
import {TranslatePipe, Translation} from '@ngx-translate/core';
import {TranslationService} from '../../services/translation.service';


@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TranslatePipe
  ],
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent {


  technologyCategories: TechnologyCategory[] = [];
  loading = true;
  error = false;
  activeCategory = 'all';

  constructor(private technologiesService: TechnologiesService, private translate: TranslationService) {
  }

  ngOnInit(): void {
    this.loadTechnologies();
    this.activeCategory = 'all';

    // Odebíráme data z BehaviorSubject pro případné aktualizace
    this.technologiesService.technologyCategories$.subscribe(
      categories => {
        this.technologyCategories = categories;
      }
    );
  }

  loadTechnologies(): void {
    this.loading = true;
    this.error = false;

    this.technologiesService.loadTechnologies().subscribe({
      next: (data) => {
        this.technologyCategories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Chyba při načítání technologií', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }

  shouldShowTech(category: string): boolean {
    return this.activeCategory === 'all' || this.activeCategory === category;
  }

  getUniqueCategories(): string[] {
    return this.technologyCategories.map(cat => cat.category);
  }

  getIconClasses(icon: IconDefinition): string {
    if (!icon) return 'fas fa-code';
    const iconName = icon.iconName;
    const prefix = icon.prefix;
    return `${prefix} fa-${iconName}`;
  }

  getCategoryName(category: string): string {
    return this.translate.translate("TECH."+category);
  }

  getCategoryShort(category: string) {
    return this.translate.translate("TECH."+category+"_SHORT");
  }
}
