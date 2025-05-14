import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    "path": "home",
    "loadComponent": () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    "path": "about",
    "loadComponent": () => import("./pages/about/about.component").then(m => m.AboutComponent),
  },
  {
    "path": "technologies",
    "loadComponent": () => import("./pages/technologies/technologies.component").then(m => m.TechnologiesComponent),
  },
  {
    "path": "projects",
    "loadComponent": () => import("./pages/projects/projects.component").then(m => m.ProjectsComponent),
  },
  {
    "path": "contact",
    "loadComponent": () => import("./pages/contact/contact.component").then(m => m.ContactComponent),
  },
  {
    "path": "**",
    "redirectTo": "home",
    "pathMatch": "full",
  },
];
