import { style } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
  <h1>{{title}}</h1>
`,
  styleUrls: ['./title.component.css']
})
export class titleComponent{

  @Input()
  title: any = "Olá,"

  @Output()
  onClick = new EventEmitter<Event>()
}

