import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

import { DataService } from '../../services/data-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  recettes$;

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    this.recettes$ = this.dataService.getRecettes().pipe(
      map(recettes => recettes.slice(0, 4))
    );
  }

  navigateToRecettes(): void {
    this.router.navigate(['/recettes']);
  }

  navigateToRecette(id: number): void {
    this.router.navigate(['/recettes', id]);
  }
}