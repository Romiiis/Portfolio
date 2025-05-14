// projects.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { TranslationService } from './translation.service';

export interface Project {
  name: string;
  shortDescription: string;
  longDescription: string;
  projectUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  projects$ = this.projectsSubject.asObservable();

  private currentLanguage: string = '';
  private loading = false;

  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) {

    this.loadProjects().subscribe({
      next: (projects) => {
        console.log('Projekty úspěšně načteny:', projects);
      },
      error: (error) => {
        console.error('Chyba při inicializačním načítání projektů:', error);
      }
    });

    // Poslouchání změn jazyka
    this.translationService.onLanguageChange().subscribe(lang => {
      console.log('Změna jazyka na:', lang);
      if (this.currentLanguage !== lang) {
        this.currentLanguage = lang;
        // Opět je potřeba provést subscribe pro načtení dat
        this.loadProjects().subscribe({
          next: (projects) => {
            console.log(`Projekty po změně jazyka na ${lang} úspěšně načteny:`, projects);
          },
          error: (error) => {
            console.error(`Chyba při načítání projektů po změně jazyka na ${lang}:`, error);
          }
        });
      }
    });
  }

  /**
   * Načte projekty podle aktuálního jazyka
   */
  loadProjects(): Observable<Project[]> {
    if (this.loading) {
      console.log('Načítání již probíhá - vracím aktuální projekty');
      return of(this.projectsSubject.getValue());
    }

    this.loading = true;
    const lang = this.translationService.getCurrentLang();
    console.log(`Načítám projekty pro jazyk: ${lang}`);

    // Oprava názvu souboru - používáme pomlčku místo podtržítka
    const url = `assets/data/projects_${lang}.json`;
    console.log(`URL pro načítání: ${url}`);

    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Načtená data ze souboru:', response);

        // Kontrola různých formátů odpovědi
        if (Array.isArray(response)) {
          // Odpověď je přímo pole projektů
          return response as Project[];
        } else if (response && response.projects && Array.isArray(response.projects)) {
          // Odpověď má objekt s polem projektů
          return response.projects as Project[];
        } else if (response) {
          // Pokus o převod neznámé struktury
          console.warn('Neznámý formát dat, pokouším se extrahovat projekty:', response);

          const possibleProjects = Object.values(response).find(val =>
            Array.isArray(val) && val.length > 0 &&
            typeof val[0] === 'object' && 'name' in val[0]
          );

          if (possibleProjects && Array.isArray(possibleProjects)) {
            return possibleProjects as Project[];
          }
        }

        console.error('Nepodařilo se najít projekty v načtených datech:', response);
        return [] as Project[];
      }),
      tap(projects => {
        console.log(`Nalezeno ${projects.length} projektů, aktualizuji stav`);
        this.projectsSubject.next(projects);
        this.loading = false;
      }),
      catchError(error => {
        console.error(`Chyba při načítání projektů pro jazyk ${lang}:`, error);

        // Pokud soubor pro aktuální jazyk neexistuje, zkus načíst anglickou verzi
        if (lang !== 'en') {
          console.warn(`Zkouším načíst anglickou verzi projektů.`);

          return this.http.get<any>('assets/data/projects-en.json').pipe(
            map(response => {
              console.log('Načtená data z anglické verze:', response);

              // Stejné zpracování jako výše
              if (Array.isArray(response)) {
                return response as Project[];
              } else if (response && response.projects && Array.isArray(response.projects)) {
                return response.projects as Project[];
              } else if (response) {
                const possibleProjects = Object.values(response).find(val =>
                  Array.isArray(val) && val.length > 0 &&
                  typeof val[0] === 'object' && 'name' in val[0]
                );

                if (possibleProjects && Array.isArray(possibleProjects)) {
                  return possibleProjects as Project[];
                }
              }

              return [] as Project[];
            }),
            tap(projects => {
              console.log(`Nalezeno ${projects.length} projektů z anglické verze, aktualizuji stav`);
              this.projectsSubject.next(projects);
              this.loading = false;
            }),
            catchError(fallbackError => {
              console.error('Chyba při načítání anglické verze projektů:', fallbackError);
              this.loading = false;
              return of([]);
            })
          );
        }

        this.loading = false;
        return of([]);
      })
    );
  }

  /**
   * Získá všechny projekty synchronně
   */
  getProjects(): Project[] {
    return this.projectsSubject.getValue();
  }
}
