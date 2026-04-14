import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Recettes } from './pages/recettes/recettes';
import { DescriptionRecette } from './pages/description-recette/description-recette';
import { PageErreur } from './pages/page-erreur/page-erreur';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Home' },
  { path: 'recettes', component: Recettes, title: 'Recettes', data: { showSearch: true }  },
  { path: 'recettes/:id', component: DescriptionRecette, title: 'Détails de la recette' },
  { path: 'error', component: PageErreur, title: 'Erreur' },
  { path: '**', redirectTo: '/error' }
];
