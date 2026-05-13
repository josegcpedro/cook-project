import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { DataService } from '../../services/data-service';
import { Recette } from '../../recette.interface';

@Component({
  selector: 'app-description-recette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description-recette.html',
  styleUrl: './description-recette.scss',
})
export class DescriptionRecette {

  recette$: Observable<Recette>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recette$ = this.dataService.getRecetteById(id);
  }

  navigateToRecettes(): void {
    this.router.navigate(['/recettes']);
  }
}