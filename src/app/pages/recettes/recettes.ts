import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { DataService } from '../../services/data-service';

@Component({
  selector: 'app-recettes',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './recettes.html',
  styleUrls: ['./recettes.scss'],
})
export class Recettes {

  searchText = '';
  showFilters = false;

  pendingFilters = {
    typePlat: '',
    typeCuisine: '',
    modeCuisson: '',
    region: '',
    sucreSale: '',
  };

  private appliedFilters$ = new BehaviorSubject({ ...this.pendingFilters });
  private pendingFilters$ = new BehaviorSubject({ ...this.pendingFilters });
  private search$ = new BehaviorSubject('');

  filteredRecettes$;
  pendingCount$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    // Écoute les query params en temps réel
    this.route.queryParams.subscribe(params => {
      const search = params['search'] || '';
      this.searchText = search;
      this.search$.next(search);

      // Ne change showFilters que si le param est explicitement présent
      if (params.hasOwnProperty('showFilters')) {
        this.showFilters = params['showFilters'] === 'true';
      }
    });

    this.filteredRecettes$ = combineLatest([
      this.dataService.getRecettes(),
      this.appliedFilters$,
      this.search$,
    ]).pipe(
      map(([recettes, filters, search]) => {
        const s = search.toLowerCase().trim();
        return recettes.filter((r) =>
          r.title.toLowerCase().includes(s) &&
          (filters.typePlat === '' || r.dish_type === filters.typePlat) &&
          (filters.typeCuisine === '' || r.cuisine_type === filters.typeCuisine) &&
          (filters.modeCuisson === '' || r.cooking_method === filters.modeCuisson) &&
          (filters.region === '' || r.region === filters.region) &&
          (filters.sucreSale === '' || r.flavor === filters.sucreSale)
        );
      })
    );

    this.pendingCount$ = combineLatest([
      this.dataService.getRecettes(),
      this.pendingFilters$,
      this.search$,
    ]).pipe(
      map(([recettes, filters, search]) => {
        const s = search.toLowerCase().trim();
        return recettes.filter((r) =>
          r.title.toLowerCase().includes(s) &&
          (filters.typePlat === '' || r.dish_type === filters.typePlat) &&
          (filters.typeCuisine === '' || r.cuisine_type === filters.typeCuisine) &&
          (filters.modeCuisson === '' || r.cooking_method === filters.modeCuisson) &&
          (filters.region === '' || r.region === filters.region) &&
          (filters.sucreSale === '' || r.flavor === filters.sucreSale)
        ).length;
      })
    );
  }

  onSearchChange(): void {
    this.search$.next(this.searchText);
  }

  onPendingChange(): void {
    this.pendingFilters$.next({ ...this.pendingFilters });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  applyFilters(): void {
    this.appliedFilters$.next({ ...this.pendingFilters });
    this.showFilters = false;
    this.router.navigate(['/recettes'], {
      queryParams: { showFilters: null },
      queryParamsHandling: 'merge'
    });
  }

  clearAllFilters(): void {
    this.pendingFilters = { typePlat: '', typeCuisine: '', modeCuisson: '', region: '', sucreSale: '' };
    this.appliedFilters$.next({ ...this.pendingFilters });
    this.pendingFilters$.next({ ...this.pendingFilters });
    this.showFilters = false;
    this.router.navigate(['/recettes'], {
      queryParams: { search: null, showFilters: null },
      queryParamsHandling: 'merge'
    });
  }

  navigateToRecette(id: number): void {
    this.router.navigate(['/recettes', id]);
  }
}