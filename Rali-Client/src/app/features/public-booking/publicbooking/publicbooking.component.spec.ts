import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicbookingComponent } from './publicbooking.component';

describe('PublicbookingComponent', () => {
  let component: PublicbookingComponent;
  let fixture: ComponentFixture<PublicbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicbookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
