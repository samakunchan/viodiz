import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizzComponent } from './add-quizz.component';

describe('AddQcmComponent', () => {
  let component: AddQuizzComponent;
  let fixture: ComponentFixture<AddQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuizzComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
