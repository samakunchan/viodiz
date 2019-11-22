import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModuleFormationComponent } from './add-module-formation.component';

describe('AddModuleFormationComponent', () => {
  let component: AddModuleFormationComponent;
  let fixture: ComponentFixture<AddModuleFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddModuleFormationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModuleFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
