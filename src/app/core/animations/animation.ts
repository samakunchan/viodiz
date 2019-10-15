import { trigger, transition, style, query, group, animate, state } from '@angular/animations';

export const slider = trigger('routeAnimations', [transition('* => *', slideTo('right'))]);

export function slideTo(to) {
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
  ];
}

const scaler = trigger('heroState', [
  state(
    'inactive',
    style({
      backgroundColor: '#eee',
      transform: 'scale(1)',
    }),
  ),
  state(
    'active',
    style({
      backgroundColor: '#cfd8dc',
      transform: 'scale(1.1)',
    }),
  ),
  transition('inactive => active', animate('100ms ease-in')),
  transition('active => inactive', animate('100ms ease-out')),
]);
