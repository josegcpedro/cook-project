import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import recettesData from '../../../../db.json';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

export interface Recette {
  id: number;
  title: string;
  image: string;

  dish_type: string;
  cuisine_type: string;
  cooking_method: string;
  region: string;
  flavor: string;
}

@Component({
  selector: 'app-recettes',
  imports: [CommonModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './recettes.html',
  styleUrl: './recettes.scss',
})
export class Recettes implements OnInit {

  // Texte saisi pour filtrer les recettes
  searchText: string = '';

  // Filtres sélectionnés par l'utilisateur
  typePlat: string = '';
  typeCuisine: string = '';
  modeCuisson: string = '';
  region: string = '';
  sucreSale: string = '';

  recettes: Recette[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recettes = recettesData.slice(0, 30);

    // Récupère la recherche depuis l’URL
    this.route.queryParams.subscribe(params => {
      this.searchText = params['search'] || '';
      // Ouvre les filtres si ?showfilters=true
      this.showFilters = params['showFilters'] === 'true';
    });
  }

  // Filtres cachés au chargement
  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  // Retourne les recettes filtrées selon le texte saisi
  get filteredRecettes() {
    const search = this.searchText.toLowerCase().trim();

    return this.recettes.filter(r =>
      r.title.toLowerCase().includes(search) &&
      (this.typePlat === '' || r.dish_type === this.typePlat) &&
      (this.typeCuisine === '' || r.cuisine_type === this.typeCuisine) &&
      (this.modeCuisson === '' || r.cooking_method === this.modeCuisson) &&
      (this.region === '' || r.region === this.region) &&
      (this.sucreSale === '' || r.flavor === this.sucreSale)
    );
  }

  navigateToRecette(id: number): void {
    this.router.navigate(['/recettes', id]);
  }

}
