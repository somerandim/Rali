import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsCardComponent } from './sports-card.component';

describe('SportsCardComponent', () => {
  let component: SportsCardComponent;
  let fixture: ComponentFixture<SportsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
