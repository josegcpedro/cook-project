import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErreur } from './page-erreur';

describe('PageErreur', () => {
  let component: PageErreur;
  let fixture: ComponentFixture<PageErreur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageErreur],
    }).compileComponents();

    fixture = TestBed.createComponent(PageErreur);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
