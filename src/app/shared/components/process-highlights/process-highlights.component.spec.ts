import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessHighlightsComponent } from './process-highlights.component';

describe('ProcessHighlightsComponent', () => {
  let component: ProcessHighlightsComponent;
  let fixture: ComponentFixture<ProcessHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessHighlightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
