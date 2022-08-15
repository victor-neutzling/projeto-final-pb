import { style } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<input type="submit" class="submit-button" [value]="value"/>`,
  styleUrls: ['./button.component.css']
})
export class buttonComponent{

  @Input()
  value: any = 'continue'

  @Output()
  onClick = new EventEmitter<Event>()
}

