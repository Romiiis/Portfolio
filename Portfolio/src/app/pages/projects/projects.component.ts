import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForOf, NgIf, NgClass } from '@angular/common';
import { ProjectsService, Project } from '../../services/projects.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    TranslateModule
  ],
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  selectedProjectIndex: number | null = null;
  expandedProjectIndex: number | null = null;
  detailsAnimating: boolean = false;
  projects: Project[] = [];

  private projectsSubscription?: Subscription;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    // Načtení projektů a naslouchání změnám
    this.projectsSubscription = this.projectsService.projects$.subscribe(projects => {
      this.projects = projects;

      // Výběr prvního projektu při načtení
      if (this.projects.length > 0) {
        this.selectProject(0);
        this.expandedProjectIndex = 0; // Rozbalení prvního projektu v mobilním zobrazení
      }
    });

    // Načtení projektů (pokud ještě nebyly načteny)
    this.projectsService.loadProjects().subscribe();
  }

  ngOnDestroy() {
    // Úklid odběrů při zničení komponenty
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
  }

  selectProject(index: number) {
    if (this.selectedProjectIndex === index) return;

    // Animace přechodu mezi detaily projektu
    if (this.selectedProjectIndex !== null) {
      this.detailsAnimating = true;
      setTimeout(() => {
        this.selectedProjectIndex = index;
        setTimeout(() => {
          this.detailsAnimating = false;
        }, 50);
      }, 300);
    } else {
      this.selectedProjectIndex = index;
    }
  }

  toggleAccordion(index: number) {
    this.expandedProjectIndex = this.expandedProjectIndex === index ? null : index;
  }
}
