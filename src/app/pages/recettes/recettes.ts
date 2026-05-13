import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { DataService } from '../../services/data-service';
import { Recette } from '../../services/recette.interface';

@Component({
  selector: 'app-recettes',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatButtonToggleModule,
  ],
  templateUrl: './recettes.html',
  styleUrls: ['./recettes.scss'],
})
export class Recettes implements OnInit {
  // Text entered to filter recipes
  searchText: string = '';

  // Filters selected but not yet applied
  pendingFilters = {
    typePlat: '',
    typeCuisine: '',
    modeCuisson: '',
    region: '',
    sucreSale: '',
  };

  // Filters currently applied to the recipe list
  appliedFilters = {
    typePlat: '',
    typeCuisine: '',
    modeCuisson: '',
    region: '',
    sucreSale: '',
  };

  recettes: Recette[] = [];

  // Filters are hidden when the page loads
  showFilters = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // Load the first 30 recipes from the data service
    this.dataService.getRecettes().subscribe((data) => {
      this.recettes = data.slice(0, 30);
    });

    // Retrieve search text and filter visibility from URL parameters
    this.route.queryParams.subscribe((params) => {
      this.searchText = params['search'] || '';

      // Open filters if ?showFilters=true is present in the URL
      this.showFilters = params['showFilters'] === 'true';
    });
  }

  // Toggle the visibility of the filter panel
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  // Returns the list of recipes filtered using applied filters + search text
  get filteredRecettes(): Recette[] {
    const search = this.searchText.toLowerCase().trim();

    return this.recettes.filter(
      (r) =>
        r.title.toLowerCase().includes(search) &&
        (this.appliedFilters.typePlat === '' ||
          r.dish_type === this.appliedFilters.typePlat) &&
        (this.appliedFilters.typeCuisine === '' ||
          r.cuisine_type === this.appliedFilters.typeCuisine) &&
        (this.appliedFilters.modeCuisson === '' ||
          r.cooking_method === this.appliedFilters.modeCuisson) &&
        (this.appliedFilters.region === '' ||
          r.region === this.appliedFilters.region) &&
        (this.appliedFilters.sucreSale === '' ||
          r.flavor === this.appliedFilters.sucreSale)
    );
  }

  // Counts how many recipes match the pending (not yet applied) filters
  get countPendingResults(): number {
    return this.recettes.filter(
      (r) =>
        (this.pendingFilters.typePlat === '' ||
          r.dish_type === this.pendingFilters.typePlat) &&
        (this.pendingFilters.typeCuisine === '' ||
          r.cuisine_type === this.pendingFilters.typeCuisine) &&
        (this.pendingFilters.modeCuisson === '' ||
          r.cooking_method === this.pendingFilters.modeCuisson) &&
        (this.pendingFilters.region === '' ||
          r.region === this.pendingFilters.region) &&
        (this.pendingFilters.sucreSale === '' ||
          r.flavor === this.pendingFilters.sucreSale)
    ).length;
  }

  // Apply the pending filters and close the filter panel
  applyFilters(): void {
    this.appliedFilters = { ...this.pendingFilters };
    this.showFilters = false;
  }

  // Reset all filters and reopen the filter panel
  clearAllFilters(): void {
    this.pendingFilters = {
      typePlat: '',
      typeCuisine: '',
      modeCuisson: '',
      region: '',
      sucreSale: '',
    };

    this.appliedFilters = {
      typePlat: '',
      typeCuisine: '',
      modeCuisson: '',
      region: '',
      sucreSale: '',
    };

    this.showFilters = true;
  }

  // Navigate to the selected recipe details page
  navigateToRecette(id: number): void {
    this.router.navigate(['/recettes', id]);
  }
}