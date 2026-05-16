import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data-service';
import { FilterService, Filters } from '../../services/filter-service';

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
  pendingFilters: Filters;

  filteredRecettes$;
  pendingCount$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private filterService: FilterService,
  ) {
    this.pendingFilters = this.filterService.getPendingFilters();
    this.filteredRecettes$ = this.filterService.filteredRecettes$;
    this.pendingCount$ = this.filterService.pendingCount$;

    // Écoute les query params en temps réel
    this.route.queryParams.subscribe((params) => {
      const search = params['search'] || '';
      this.searchText = search;
      this.filterService.setSearch(search);

      // Ne change showFilters que si le param est explicitement présent
      if (params.hasOwnProperty('showFilters')) {
        this.showFilters = params['showFilters'] === 'true';
      }
    });
  }

  onSearchChange(): void {
    this.filterService.setSearch(this.searchText);
  }

  onPendingChange(): void {
    this.filterService.setPendingFilters({ ...this.pendingFilters });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  applyFilters(): void {
    this.filterService.applyFilters();
    this.showFilters = false;
    this.router.navigate(['/recettes'], {
      queryParams: { showFilters: null },
      queryParamsHandling: 'merge',
    });
  }

  clearAllFilters(): void {
    this.filterService.clearAllFilters();
    this.pendingFilters = this.filterService.getPendingFilters();
    this.showFilters = false;
    this.router.navigate(['/recettes'], {
      queryParams: { search: null, showFilters: null },
      queryParamsHandling: 'merge',
    });
  }

  navigateToRecette(id: number): void {
    this.router.navigate(['/recettes', id]);
  }

  closeFilter(): void {
    this.showFilters = false;
    this.router.navigate(['/recettes'], {
      queryParams: { showFilters: null },
      queryParamsHandling: 'merge',
    });
  }

  resetFilters(): void {
    this.filterService.resetPendingFilters();
    this.pendingFilters = this.filterService.getPendingFilters();
  }
}
