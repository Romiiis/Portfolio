// technologies.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';
import {iconMap} from '../model/icon-map';
import {TechnologyCategory} from '../model/TechnologyCategory';

@Injectable({
  providedIn: 'root'
})

/**
 * TechnologiesService is responsible for loading and managing technology data.
 * It fetches technology categories and their respective technologies from a JSON file.
 * The service provides an observable to access the loaded technology categories.
 */
export class TechnologiesService {

  // URL to the JSON file containing technology data
  private dataUrl = 'assets/data/technologies.json';

  // BehaviorSubject to hold the loaded technology categories
  private loadedData = new BehaviorSubject<TechnologyCategory[]>([]);

  // Observable to expose the loaded technology categories
  public technologyCategories$ = this.loadedData.asObservable();


  /**
   * Constructor for the TechnologiesService.
   * @param http The HttpClient instance to make HTTP requests.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Load technologies from the JSON file and process them.
   * This method fetches the data, sorts the categories and technologies,
   * and maps icon strings to FontAwesome icons.
   */
  loadTechnologies(): Observable<TechnologyCategory[]> {

    return this.http.get<{ technologyCategories: TechnologyCategory[] }>(this.dataUrl).pipe(
      map(response => {
        const categories = response.technologyCategories;

        // Sort categories by name
        return categories.map(category => {

          // Sort technologies by name
          const sortedTechnologies = [...category.technologies].sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          // Map icon strings to FontAwesome icons
          const technologiesWithIcons = sortedTechnologies.map(tech => ({
            ...tech,
            icon: this.mapIconStringToFaIcon(tech.icon)
          }));

          return {
            category: category.category,
            technologies: technologiesWithIcons
          };
        });
      }),

      tap(data => this.loadedData.next(data)),
      catchError(error => {
        console.error('Error while loading techs', error);
        return of([]);
      })
    );
  }

  /**
   * Convert icon string to FontAwesome icon object
   * @param iconString String representation of the icon
   */
  private mapIconStringToFaIcon(iconString: string): any {
    return iconString in iconMap ? iconMap[iconString] : iconMap['faCode'];
  }
}
