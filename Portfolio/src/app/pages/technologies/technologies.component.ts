import { Component } from '@angular/core';
import {NgForOf, NgClass, NgIf} from '@angular/common';
import {
  faJava,
  faPython,
  faJs,
  faAngular,
  faNodeJs,
  faDocker,
  faGit,
  faHtml5,
  faPhp,
  faLinux, faMicrosoft, faJira
} from '@fortawesome/free-brands-svg-icons';
import {faDatabase, faCode, faFileCode} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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
    NgIf
  ],
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent {


  // Vaše existující datová struktura
  technologyCategories: TechnologyCategory[] = [
    {
      category: 'TECHNOLOGIES.LANGUAGES',
      technologies: [
        { name: 'Assembler', icon: faCode, url: 'https://en.wikipedia.org/wiki/Assembly_language' },
        { name: 'C', icon: faCode, url: 'https://en.wikipedia.org/wiki/C_(programming_language)' },
        { name: 'C++', icon: faCode, url: 'https://en.wikipedia.org/wiki/C%2B%2B' },
        { name: 'C#', icon: faCode, url: 'https://learn.microsoft.com/en-us/dotnet/csharp/' },
        { name: 'Java', icon: faJava, url: 'https://www.java.com/' },
        { name: 'Python', icon: faPython, url: 'https://www.python.org/' },
        { name: 'JavaScript', icon: faJs, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'TypeScript', icon: faCode, url: 'https://www.typescriptlang.org/' },
        { name: 'SQL', icon: faDatabase, url: 'https://en.wikipedia.org/wiki/SQL' },
        { name: 'PHP', icon: faPhp, url: 'https://www.php.net/' },
        { name: 'Matlab', icon: faCode, url: 'https://www.mathworks.com/products/matlab.html' }
      ].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
      category: 'TECHNOLOGIES.FRAMEWORKS',
      technologies: [
        { name: 'Angular', icon: faAngular, url: 'https://angular.io/' },
        { name: 'Node.js', icon: faNodeJs, url: 'https://nodejs.org/' },
        { name: 'Java Spring', icon: faCode, url: 'https://spring.io/' },
        { name: 'HTML & CSS', icon: faHtml5, url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
        { name: 'Spigot (Minecraft)', icon: faCode, url: 'https://www.spigotmc.org/' }
      ].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
      category: 'TECHNOLOGIES.TOOLS',
      technologies: [
        { name: 'Docker', icon: faDocker, url: 'https://www.docker.com/' },
        { name: 'Git', icon: faGit, url: 'https://git-scm.com/' },
        { name: 'Jira', icon: faJira, url: 'https://www.atlassian.com/software/jira' },
        { name: 'LaTeX', icon: faFileCode, url: 'https://www.latex-project.org/' },
        { name: 'Linux', icon: faLinux, url: 'https://www.linux.org/' },
        { name: 'MongoDB', icon: faDatabase, url: 'https://www.mongodb.com/' },
        { name: 'Office 365', icon: faMicrosoft, url: 'https://www.office.com/' },
      ].sort((a, b) => a.name.localeCompare(b.name))
    }
  ];

  constructor() {}

  activeCategory: string = 'all';

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
    switch(category) {
      case 'TECHNOLOGIES.LANGUAGES':
        return 'Programming Languages';
      case 'TECHNOLOGIES.FRAMEWORKS':
        return 'Frameworks';
      case 'TECHNOLOGIES.TOOLS':
        return 'Tools';
      default:
        return category;
    }
  }
}
