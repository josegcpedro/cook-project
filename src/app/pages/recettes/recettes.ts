import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.recettes = recettesData.slice(0, 10);
  }

  navigateToRecette(id: number): void {
    this.router.navigate(['/recettes', id]);
  }

}
