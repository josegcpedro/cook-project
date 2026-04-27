import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  showSearch = false;

  search = new FormControl('');

  constructor(private router: Router) {

    // will only  show the search bar to route who start with "recettes"
    const updateVisibility = (url: string) => {
      this.showSearch = url.startsWith('/recettes');
    };

    updateVisibility(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        updateVisibility(event.urlAfterRedirects);
      });
      // Envoie la recherche dans l’URL
    this.search.valueChanges.subscribe(value => {
     this.router.navigate([], {
      queryParams: { search: value },
      queryParamsHandling: 'merge'
    });
  });
  }
  // ouvre/ferme les filtres dans la page recettes
openMenu() {
  const current = this.router.url.includes('showFilters=true');
  const newValue = current ? 'false' : 'true';

  this.router.navigate(['/recettes'], {
    queryParams: { showFilters: newValue },
    queryParamsHandling: 'merge'
  });
}


// Retourne à la page d'accueil
navigateToHome(): void {
  this.router.navigate(['/home']);
}
}

