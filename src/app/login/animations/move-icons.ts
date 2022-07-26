import {animate,state,style,transition,trigger} from "@angular/animations"

export const moveIcon = trigger(
  'moveIcon',
  [
    state('enter',style({left: '320px' })),
    state('leave',style({left: '380px' })),

    transition(
      'leave => enter',
      [
        animate('0s')
      ]
    ),
    transition(
      'enter => leave',
      [
        animate('0s')
      ]
    )
  ]
)
