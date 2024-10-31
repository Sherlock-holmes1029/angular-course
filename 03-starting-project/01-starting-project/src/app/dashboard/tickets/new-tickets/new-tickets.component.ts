import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  output,
  Output,
  ViewChild,
  viewChild,
  ViewChildren,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-new-tickets',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-tickets.component.html',
  styleUrl: './new-tickets.component.css',
})
export class NewTicketsComponent {
  // @ViewChild('form') private form?:ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  // @ViewChildren(ButtonComponent) button

  // @Output() add=new EventEmitter();
  add=output<{title:string,text:string}>()

  // ngAfterViewInit(): void {
  //   console.log('after view init');
  //   console.log(this.form().nativeElement.reset());
  // }

  // ngOnInit(): void {
  //   console.log('on init');
  //   console.log(this.form().nativeElement.reset());
  // }

  onSubmit(title: HTMLInputElement, textarea: HTMLTextAreaElement) {
    this.add.emit({title:title.value,text:textarea.value})
    this.form().nativeElement.reset();
  }
}
