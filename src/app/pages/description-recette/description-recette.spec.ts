import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionRecette } from './description-recette';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('DescriptionRecette', () => {
  let component: DescriptionRecette;
  let fixture: ComponentFixture<DescriptionRecette>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionRecette],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }),
            snapshot: { paramMap: convertToParamMap({ id: '1' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DescriptionRecette);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
