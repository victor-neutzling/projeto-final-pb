import { style } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
  <input
  type="text"
  id="userName"
  [placeholder]="placeholder"

  />
`,
  styleUrls: ['./input.component.css']
})
export class inputComponent{

  @Input()
  placeholder: any = "Usuario"

  @Output()
  onClick = new EventEmitter<Event>()
}

