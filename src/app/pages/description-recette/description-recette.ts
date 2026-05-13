import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data-service';
import { Recette } from '../../services/recette.interface';

@Component({
  selector: 'app-description-recette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description-recette.html',
  styleUrl: './description-recette.scss',
})
export class DescriptionRecette implements OnInit {
  recette?: Recette;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.dataService.getRecetteById(id).subscribe((data) => {
      this.recette = data;
    });
  }

  navigateToRecettes(): void {
    this.router.navigate(['/recettes']);
  }
}