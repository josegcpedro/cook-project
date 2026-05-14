import { TestBed } from '@angular/core/testing';
import { Recettes } from './recettes';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Recettes', () => {

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [Recettes],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(Recettes);

    expect(fixture.componentInstance).toBeTruthy();
  });
});