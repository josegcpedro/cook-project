import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-erreur',
  imports: [],
  templateUrl: './page-erreur.html',
  styleUrl: './page-erreur.scss',
})
export class PageErreur {
  constructor(private router: Router) {}

  retourAccueil(): void {
    this.router.navigate(['/home']);
  }
}
