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
    // Will only show the search bar to routes that start with "recettes"
    const updateVisibility = (url: string) => {
      const path = url.split('?')[0];
      this.showSearch = path === '/recettes';
    };

    updateVisibility(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        updateVisibility(event.urlAfterRedirects);
      });
    // Sends the search input to the URL
    this.search.valueChanges.subscribe((value) => {
      this.router.navigate([], {
        queryParams: { search: value },
        queryParamsHandling: 'merge',
      });
    });
  }
  // Opens/closes filters on the recipes page
  openMenu() {
    const current = this.router.url.includes('showFilters=true');
    const newValue = current ? 'false' : 'true';

    this.router.navigate(['/recettes'], {
      queryParams: { showFilters: newValue },
      queryParamsHandling: 'merge',
    });
  }

  // Returns to the home page
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
