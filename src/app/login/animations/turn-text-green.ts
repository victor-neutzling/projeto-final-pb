
import {animate,state,style,transition,trigger} from "@angular/animations"

export const turnTextGreen = trigger(
  'turnTextGreen',
  [
    state('enter',style({color: '#66ff00'})),
    state('leave',style({color: '#e9b425'})),

    transition(
      'leave => enter',
      [
        animate('0.2s')
      ]
    ),
    transition(
      'enter => leave',
      [
        animate('0.2s')
      ]
    )
  ]
)
