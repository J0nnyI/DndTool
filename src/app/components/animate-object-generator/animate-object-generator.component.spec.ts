import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateObjectGeneratorComponent } from './animate-object-generator.component';

describe('AnimateObjectGeneratorComponent', () => {
  let component: AnimateObjectGeneratorComponent;
  let fixture: ComponentFixture<AnimateObjectGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimateObjectGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateObjectGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
