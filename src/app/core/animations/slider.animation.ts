import { trigger, transition, style, query, group, animate } from '@angular/animations';

export const slider = trigger('routeAnimations', [
  transition('* => toLeft', slideTo('right')),
  transition('* => toLeft1', slideTo('right')),
  transition('* => toLeft2', slideTo('right')),
  transition('* => toLeft3', slideTo('right')),
  transition('* => toLeft4', slideTo('right')),
]);

function slideTo(to) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          [to]: 0,
          width: '100%',
        }),
      ],
      optional,
    ),
    query(':enter', [style({ [to]: '-100%' })]),
    group([
      query(':leave', [animate('600ms ease', style({ [to]: '100%' }))], optional),
      query(':enter', [animate('600ms ease', style({ [to]: '0%' }))]),
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
