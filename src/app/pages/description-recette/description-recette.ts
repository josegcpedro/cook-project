import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import recettesData from '../../../../db.json';

export interface Recette {
  id: number;
  description: string;
  histoire: string;
  preparation_time: string;
  cooking_time: string;
  ingredients: string[];
  preparation: string[];
  portion: string;
  dish_type: string;
  cuisine_type: string;
  cooking_method: string;
  region: string;
  flavor: string;
  difficulty: string;
  image: string;
}

@Component({
  selector: 'app-description-recette',
  imports: [CommonModule],
  templateUrl: './description-recette.html',
  styleUrl: './description-recette.scss',
})
export class DescriptionRecette implements OnInit {
  recette: Recette | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recette = recettesData.find(r => r.id === id);
  }

  navigateToRecettes(): void {
    this.router.navigate(['/recettes']);
  }
}
