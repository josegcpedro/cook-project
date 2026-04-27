import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
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
export class Header implements OnInit {
  showSearch = false;

  search = new FormControl('');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {

    // show the search bar only on the /recettes list page (not on /recettes/:id)
    const updateVisibility = (url: string) => {
      const path = url.split('?')[0];
      this.showSearch = path === '/recettes';
      if (this.showSearch) {
        this.updateSearchFromQuery();
      }
    };

    updateVisibility(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        updateVisibility(event.urlAfterRedirects);
      });
  }

  ngOnInit() {
    this.search.valueChanges.subscribe((value) => {
      if (this.showSearch) {
        this.router.navigate(['/recettes'], { queryParams: { search: value || '' } });
      }
    });
  }

  private updateSearchFromQuery() {
    const searchValue = this.route.snapshot.queryParams['search'] || '';
    if (this.search.value !== searchValue) {
      this.search.setValue(searchValue, { emitEvent: false });
    }
  }

  openMenu() {
    console.log('menu ouvert');
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
