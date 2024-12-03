import {Component} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  imports: [
    NgOptimizedImage,
    NgIf,
    NgForOf,
  ],
  standalone: true
})
export class ProjectsComponent {
  projects: any[] = [];
  selectedProject: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/projects.json').subscribe(
      (data) => {
        console.log('Project data:', data); // Debugging log
        this.projects = data;
      },
      (error) => {
        console.error('Error loading project data:', error);
      }
    );
  }

  setDefaultImage(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available'; // External fallback image URL
  }

  openModal(project: any): void {
    this.selectedProject = project;
  }

  closeModal(): void {
    this.selectedProject = null;
  }
}
