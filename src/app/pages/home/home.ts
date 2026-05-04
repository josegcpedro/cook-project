import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import recettesData from '../../../../db.json';

export interface Recette {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  recettes: Recette[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.recettes = recettesData.slice(0, 4);
  }

  navigateToRecettes(): void {
    this.router.navigate(['/recettes']);
  }

  navigateToRecette(id: number): void {
    this.router.navigate(['/recettes', id]);
  }
}
