import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faJava, faPython, faJs, faAngular, faNodeJs, faDocker, faGit, faHtml5, faCss3, faPhp } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCode } from '@fortawesome/free-solid-svg-icons';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';


interface Technology {
  name: string;
  icon: IconDefinition; // Optional Font Awesome icon
  url: string;           // URL for the technology
}

interface TechnologyCategory {
  category: string;
  technologies: Technology[];
}

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  standalone: true,
  imports: [
    NgForOf,
    FaIconComponent,
    NgIf,
  ],
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent {

  // Grouped and sorted technologies
  technologyCategories: TechnologyCategory[] = [
    {
      category: 'Programming Languages',
      technologies: [
        { name: 'Assembler',icon: faCode, url: 'https://en.wikipedia.org/wiki/Assembly_language' }, // Using an image
        { name: 'C', icon: faCode, url: 'https://en.wikipedia.org/wiki/C_(programming_language)' },
        { name: 'C++', icon: faCode, url: 'https://en.wikipedia.org/wiki/C%2B%2B' },
        { name: 'C#', icon: faCode, url: 'https://learn.microsoft.com/en-us/dotnet/csharp/' },
        { name: 'Java', icon: faJava, url: 'https://www.java.com/' },
        { name: 'Python', icon: faPython, url: 'https://www.python.org/' },
        { name: 'JavaScript', icon: faJs, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'TypeScript', icon: faCode, url: 'https://www.typescriptlang.org/' },
        { name: 'SQL', icon: faDatabase, url: 'https://en.wikipedia.org/wiki/SQL' },
        { name: 'PHP', icon: faPhp, url: 'https://www.php.net/' },
        { name: 'Matlab', icon: faCode, url: 'https://www.mathworks.com/products/matlab.html' } // Using an image
      ].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
      category: 'Frameworks & Libraries',
      technologies: [
        { name: 'Angular', icon: faAngular, url: 'https://angular.io/' },
        { name: 'Node.js', icon: faNodeJs, url: 'https://nodejs.org/' },
        { name: 'Java Spring', icon: faCode, url: 'https://spring.io/' },
        { name: 'HTML & CSS', icon: faHtml5, url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
        { name: 'Spigot (Minecraft)', icon:faCode, url: 'https://www.spigotmc.org/' } // Using an image
      ].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
      category: 'Tools & Platforms',
      technologies: [
        { name: 'Docker', icon: faDocker, url: 'https://www.docker.com/' },
        { name: 'Git', icon: faGit, url: 'https://git-scm.com/' },
        { name: 'MongoDB', icon: faDatabase, url: 'https://www.mongodb.com/' }
      ].sort((a, b) => a.name.localeCompare(b.name))
    }
  ];
}
