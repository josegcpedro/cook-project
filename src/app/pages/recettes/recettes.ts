import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import recettesData from '../../../../db.json';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface Recette {
  id: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-recettes',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './recettes.html',
  styleUrl: './recettes.scss',
})
export class Recettes implements OnInit {
  recettes: Recette[] = [];
  filteredRecettes: Recette[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.recettes = recettesData.slice(0, 10);
    this.filteredRecettes = [...this.recettes];

    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'] || '';
      this.filterRecettes(searchTerm);
    });
  }

  // If we search, we only get the recipes that match the search.
  // Otherwise, we get all recipes.
  private filterRecettes(term: string): void {
    if (!term) {
      this.filteredRecettes = [...this.recettes];
    } else {
      this.filteredRecettes = this.recettes.filter((recette) =>
        recette.description.toLowerCase().includes(term.toLowerCase()),
      );
    }
  }

  navigateToRecette(id: number): void {
    this.router.navigate(['/recettes', id]);
  }

}
