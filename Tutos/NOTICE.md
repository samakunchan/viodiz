# Notice

## Interface

    #notice/notice.interface.ts
    export interface Notice {
      type?: string;
      message: string;
    }

## Service

    #notice/notice.service.ts
    import { BehaviorSubject } from 'rxjs';
    import { Notice } from './chemin/vers/notice.interface';
    ...
    ...
    export class NoticeService {
      onNoticeChanged$: BehaviorSubject<Notice>;

      constructor() {
        this.onNoticeChanged$ = new BehaviorSubject(null);
      }

      setNotice(message: string, type?: string) {
        const notice: Notice = {
          message: message,
          type: type,
        };
        this.onNoticeChanged$.next(notice);
      }
    }

## Component

    import { ChangeDetectorRef, Component, OnDestroy, OnInit, Output } from '@angular/core';
    import { Subscription } from 'rxjs';
    import { NoticeService } from '../../../../core/notice/notice.service';
    import { Notice } from '../../../../core/notice/notice.interface';

    @Component({
      selector: 'app-notice',
      templateUrl: './notice.component.html',
      styleUrls: ['./notice.component.scss'],
    })
    export class NoticeComponent implements OnInit, OnDestroy {
      @Output() type: any;
      @Output() message: any = '';

      // Private properties
      private subscriptions: Subscription[] = [];

      /**
       * Component Constructor
       *
       * @param noticeService: NoticeService
       * @param cdr: ChangeDetectorRef
       */
      constructor(public noticeService: NoticeService, private cdr: ChangeDetectorRef) {}

      /*
       * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
       */

      /**
       * On init
       */
      ngOnInit() {
        this.subscriptions.push(
          this.noticeService.onNoticeChanged$.subscribe((notice: Notice) => {
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

## HTML

    <div [hidden]="!message" class="alert alert-{{ type }}" role="alert" #alertNotice>
      <div class="alert-text" [innerHTML]="message"></div>
    </div>
