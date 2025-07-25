import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupHeroComponent } from './startup-hero.component';

describe('StartupHeroComponent', () => {
  let component: StartupHeroComponent;
  let fixture: ComponentFixture<StartupHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartupHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
