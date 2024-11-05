import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {

  userName=input.required<string>()
  message = input.required<string>();
  // private activatedRoute = inject(ActivatedRoute);


  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next:data=>console.log(data)
  //   })
  // }


  // userId = input.required<string>();
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // // userName = computed(
  // //   () => this.usersService.users.find((u) => u.id === this.userId())?.name
  // // );


  // userName = '';

  // ngOnInit(): void {
  //   console.log('[message]:' + this.message());
  //   console.log(this.activatedRoute);
  //   const sub = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) =>
  //       (this.userName =
  //         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || ''),
  //   });
  //   this.destroyRef.onDestroy(() => sub.unsubscribe);
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
 ) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))
  ?.name || '';
  return userName
  };

  export const resolveTitle:ResolveFn<string>=(activatedRoute,routerState)=>{
    return resolveUserName(activatedRoute,routerState)+'\'s Tasks'
     
  }