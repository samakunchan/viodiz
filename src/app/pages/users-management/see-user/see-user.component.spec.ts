import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeUserComponent } from './see-user.component';

describe('SeeUserComponent', () => {
  let component: SeeUserComponent;
  let fixture: ComponentFixture<SeeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeeUserComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
