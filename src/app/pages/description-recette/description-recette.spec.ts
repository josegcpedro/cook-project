import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionRecette } from './description-recette';

describe('DescriptionRecette', () => {
  let component: DescriptionRecette;
  let fixture: ComponentFixture<DescriptionRecette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionRecette],
    }).compileComponents();

    fixture = TestBed.createComponent(DescriptionRecette);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
