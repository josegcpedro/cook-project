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
    const updateVisibility = (url: string) => {
      this.showSearch = url.startsWith('/recettes');
    };

    updateVisibility(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        updateVisibility(event.urlAfterRedirects);
      });
  }
  // to filter
  openMenu() {
    console.log('menu ouvert');
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
