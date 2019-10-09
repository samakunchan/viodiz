import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsSigninComponent } from './socials-signin.component';

describe('SocialsSigninComponent', () => {
  let component: SocialsSigninComponent;
  let fixture: ComponentFixture<SocialsSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialsSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialsSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
