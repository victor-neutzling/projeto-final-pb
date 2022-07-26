import {animate,state,style,transition,trigger} from "@angular/animations"

export const turnYellow = trigger(
  'turnYellow',
  [
    state('enter',style({borderColor: '#e0e0e0'})),
    state('leave',style({borderColor: '#e9b425' })),

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
