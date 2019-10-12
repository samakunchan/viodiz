import { ChangeDetectorRef, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthNoticeService } from '../../../../core/auth-notice/auth-notice.service';
import { AuthNotice } from '../../../../core/auth-notice/auth-notice.interface';

@Component({
  selector: 'app-auth-notice',
  templateUrl: './auth-notice.component.html',
})
export class AuthNoticeComponent implements OnInit, OnDestroy {
  @Output() type: any;
  @Output() message: any = '';

  // Private properties
  private subscriptions: Subscription[] = [];

  /**
   * Component Constructor
   *
   * @param authNoticeService: AuthNoticeService
   * @param cdr: ChangeDetectorRef
   */
  constructor(public authNoticeService: AuthNoticeService, private cdr: ChangeDetectorRef) {}

  /*
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.subscriptions.push(
      this.authNoticeService.onNoticeChanged$.subscribe((notice: AuthNotice) => {
        notice = Object.assign({}, { message: '', type: '' }, notice);
        this.message = notice.message;
        this.type = notice.type;
        this.cdr.markForCheck();
      }),
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
