import { Injectable } from '@angular/core';
import recettesData from '../../../db.json';

export interface Recette {
  id: number;
  title: string;
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

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly recettes: Recette[] = recettesData as Recette[];

  getRecettes(): Recette[] {
    return this.recettes;
  }

  getRecetteById(id: number): Recette | undefined {
    return this.recettes.find((r) => r.id === id);
  }
}
