import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService, Recette } from '../../services/data-service';

@Component({
  selector: 'app-description-recette',
  imports: [CommonModule],
  templateUrl: './description-recette.html',
  styleUrl: './description-recette.scss',
})
export class DescriptionRecette implements OnInit {
  recette: Recette | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recette = this.dataService.getRecetteById(id);
  }

  navigateToRecettes(): void {
    this.router.navigate(['/recettes']);
  }
}
