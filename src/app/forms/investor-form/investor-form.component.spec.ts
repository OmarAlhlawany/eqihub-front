import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorFormComponent } from './investor-form.component';

describe('InvestorFormComponent', () => {
  let component: InvestorFormComponent;
  let fixture: ComponentFixture<InvestorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
