import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$);

  customInterval = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval=setInterval(() => {
      if(timesExecuted>3){
        clearInterval(interval)
        subscriber.complete()
        return
      }
      subscriber.next({ message: 'new value' });
      console.log('emittingnew value');
      timesExecuted++;
    }, 1000);
  });

  constructor() {
    effect(() => {
      console.log(`CLicked button ${this.clickCount}`);
    });
  }

  clickCount = signal(0);

  ngOnInit(): void {
    // const sub = interval(1000)
    //   .pipe(map((val) => val * 1))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });
    // this.destroyRef.onDestroy(() => {
    //   sub.unsubscribe();
    // });
    this.customInterval.subscribe({
      next: (val) => console.log(val),
      complete:()=>console.log('completed')
    });
  }

  onClick() {
    this.clickCount.update((prev) => prev + 1);
  }
}
