import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  imports: [
    NgOptimizedImage,
    NgIf,
    NgForOf,
    TranslateModule // Add this
  ],
  standalone: true
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: any[] = [];
  selectedProject: any = null;
  private langSubscription?: Subscription;

  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadProjects();

    this.langSubscription = this.translateService.onLangChange.subscribe(() => {
      console.log('Language changed to:', this.translateService.currentLang);
      this.loadProjects();
    });
  }

  private loadProjects(): void {
    const currentLang = this.translateService.currentLang;
    const projectsFile = currentLang === "en"
      ? "assets/projects.json"
      : "assets/projects_cs.json";

    console.log('Loading projects from:', projectsFile);
    this.http.get<any[]>(projectsFile).subscribe({
      next: (data) => {
        console.log('Project data:', data);
        this.projects = data;
      },
      error: (error) => {
        console.error('Error loading project data:', error);
      }
    });
  }

  setDefaultImage(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
  }

  openModal(project: any): void {
    this.selectedProject = project;
  }

  closeModal(): void {
    this.selectedProject = null;
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}
