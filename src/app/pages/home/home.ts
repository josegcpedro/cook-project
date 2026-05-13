import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataService } from '../../services/data-service';
import { Recette } from '../../services/recette.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  recettes: Recette[] = [];

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getRecettes().subscribe((data) => {
      this.recettes = data.slice(0, 4);
    });
  }

  navigateToRecettes(): void {
    this.router.navigate(['/recettes']);
  }

  navigateToRecette(id: number): void {
    this.router.navigate(['/recettes', id]);
  }
}