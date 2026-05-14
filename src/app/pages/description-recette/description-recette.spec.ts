import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { DescriptionRecette } from './description-recette';

describe('DescriptionRecette', () => {

  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionRecette, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(DescriptionRecette);

    expect(fixture.componentInstance).toBeTruthy();
  });
});