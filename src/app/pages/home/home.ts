import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService, Recette } from '../../services/data-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  recettes: Recette[] = [];

  constructor(
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.recettes = this.dataService.getRecettes().slice(0, 4);
  }

  navigateToRecettes(): void {
    this.router.navigate(['/recettes']);
  }

  navigateToRecette(id: number): void {
    this.router.navigate(['/recettes', id]);
  }
}
