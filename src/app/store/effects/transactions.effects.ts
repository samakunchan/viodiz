import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RequestTransaction, TransactionCompleted, TransactionsActionTypes } from '../actions/transactions.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, currentUser } from '../index';
import { AuthService } from '../../core/services/auth.service';
import { Students } from '../../core/models/students.model';
import { getCurrentCourse } from '../selectors/courses.selector';

@Injectable()
export class TransactionsEffects {
  @Effect({ dispatch: false })
  requestTransaction$ = this.actions$.pipe(
    ofType<RequestTransaction>(TransactionsActionTypes.RequestTransaction),
    tap(action => this.store.dispatch(new TransactionCompleted({ paypal: action.payload.paypal }))),
  );
  @Effect({ dispatch: false })
  transactionComplete$ = this.actions$.pipe(
    ofType<TransactionCompleted>(TransactionsActionTypes.TransactionCompleted),
    tap(action => {

      this.store.select(getCurrentCourse).subscribe(res => {
        if (res) {
          this.store.select(currentUser).subscribe(_user => {
            const student = new Students();
            student.clear();
            student.uid = _user.uid;
            student.createAt = action.payload.paypal.create_time;
            student.productId = action.payload.paypal.product.id;
            student.coursesFollowed.push(res);
            console.log(student);
            this.authService.createAuthUserStudent(student).subscribe(studentRes => {
              if (studentRes) {
                console.log('student created');
              }
            });
            if (
              _user &&
              _user.role !== 'CONSTRUCTOR' &&
              _user.role !== 'ADMIN' &&
              _user.role !== 'MODERATOR' &&
              _user.role !== 'EMPLOYEE' ) {
              _user.role = 'USER PREMIUM';
              _user.isStudent = true;
              console.log('role updated');
              // Vérifier si il faut absolument écrire .subscribe pour que ça marche
              this.authService.updateAuthUserProfil(_user);
            }
          });
        }
      });
    })
  );
  constructor(private actions$: Actions, private store: Store<AppState>, private authService: AuthService) {}
}
