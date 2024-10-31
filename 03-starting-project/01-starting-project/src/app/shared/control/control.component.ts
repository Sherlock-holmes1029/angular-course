import { AfterViewInit, Component, contentChild, ContentChild, ElementRef, input } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
})
export class ControlComponent {
  label = input.required<string>();
  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;

  private control=contentChild<ElementRef<HTMLInputElement|HTMLTextAreaElement>>('input')


  onClick() {
    console.log('CLicked');
    console.log(this.control);
  }
}
