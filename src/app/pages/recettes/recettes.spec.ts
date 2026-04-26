import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Recettes } from './recettes';

describe('Recettes', () => {
  let component: Recettes;
  let fixture: ComponentFixture<Recettes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recettes],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: { subscribe: () => {} }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Recettes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
