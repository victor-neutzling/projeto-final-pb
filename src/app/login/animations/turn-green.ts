
import {animate,state,style,transition,trigger} from "@angular/animations"

export const turnGreen = trigger(
  'turnGreen',
  [
    state('enter',style({borderColor: 'green'})),
    state('leave',style({borderColor: 'green'})),

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
