import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recettes } from './recettes';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

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
            queryParams: of({})
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
