import { Injectable } from '@angular/core';
import recettesData from '../../../db.json';
import { Recette } from './recette.interface';

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
