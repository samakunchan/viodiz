import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RoleEffects } from './role.effects';

describe('RoleEffects', () => {
  // @ts-ignore
  const actions$: Observable<any>;
  let effects: RoleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get<RoleEffects>(RoleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
