import {animate,state,style,transition,trigger} from "@angular/animations"

export const moveIcon = trigger(
  'moveIcon',
  [
    state('enter',style({left: '320px' })),
    state('leave',style({left: '380px' })),

    transition(
      'leave => enter',
      [
        animate('0.2s ease-in-out')
      ]
    ),
    transition(
      'enter => leave',
      [
        animate('0.2s ease-in-out')
      ]
    )
  ]
)
