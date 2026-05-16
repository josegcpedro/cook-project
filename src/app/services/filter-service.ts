import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Recette } from '../recette.interface';
import { DataService } from './data-service';

export interface Filters {
  typePlat: string;
  typeCuisine: string;
  modeCuisson: string;
  region: string;
  sucreSale: string;
}

const FILTERS_STORAGE_KEY = 'recettes-filters';
const DEFAULT_FILTERS: Filters = {
  typePlat: '',
  typeCuisine: '',
  modeCuisson: '',
  region: '',
  sucreSale: '',
};

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private platformId = inject(PLATFORM_ID);

  private appliedFilters$ = new BehaviorSubject<Filters>({ ...DEFAULT_FILTERS });
  private pendingFilters$ = new BehaviorSubject<Filters>({ ...DEFAULT_FILTERS });
  private search$ = new BehaviorSubject<string>('');

  filteredRecettes$: Observable<Recette[]>;
  pendingCount$: Observable<number>;

  constructor(private dataService: DataService) {
    this.loadFilters();

    this.filteredRecettes$ = combineLatest([
      this.dataService.getRecettes(),
      this.appliedFilters$,
      this.search$,
    ]).pipe(map(([recettes, filters, search]) => this.filterRecettes(recettes, filters, search)));

    this.pendingCount$ = combineLatest([
      this.dataService.getRecettes(),
      this.pendingFilters$,
      this.search$,
    ]).pipe(
      map(([recettes, filters, search]) => this.filterRecettes(recettes, filters, search).length),
    );
  }

  private filterRecettes(recettes: Recette[], filters: Filters, search: string): Recette[] {
    const s = search.toLowerCase().trim();
    return recettes.filter(
      (r) =>
        r.title.toLowerCase().includes(s) &&
        (filters.typePlat === '' || r.dish_type === filters.typePlat) &&
        (filters.typeCuisine === '' || r.cuisine_type === filters.typeCuisine) &&
        (filters.modeCuisson === '' || r.cooking_method === filters.modeCuisson) &&
        (filters.region === '' || r.region === filters.region) &&
        (filters.sucreSale === '' || r.flavor === filters.sucreSale),
    );
  }

  private saveFilters(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(this.pendingFilters$.value));
  }

  private loadFilters(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const saved = localStorage.getItem(FILTERS_STORAGE_KEY);
    if (!saved) return;

    const filters = JSON.parse(saved);
    this.appliedFilters$.next(filters);
    this.pendingFilters$.next(filters);
  }

  setSearch(search: string): void {
    this.search$.next(search);
  }

  getSearch(): Observable<string> {
    return this.search$.asObservable();
  }

  setPendingFilters(filters: Filters): void {
    this.pendingFilters$.next(filters);
    this.saveFilters();
  }

  getPendingFilters(): Filters {
    return { ...this.pendingFilters$.value };
  }

  applyFilters(): void {
    this.appliedFilters$.next({ ...this.pendingFilters$.value });
    this.saveFilters();
  }

  clearAllFilters(): void {
    this.pendingFilters$.next({ ...DEFAULT_FILTERS });
    this.appliedFilters$.next({ ...DEFAULT_FILTERS });
    this.search$.next('');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(FILTERS_STORAGE_KEY);
    }
  }

  resetPendingFilters(): void {
    this.pendingFilters$.next({ ...DEFAULT_FILTERS });
  }
}
