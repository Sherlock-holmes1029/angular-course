import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounce, debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'text@example.com') {
    return of(null);
  }
  return of({ notUnique: true });
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsValid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit(): void {
    const savedForm=window.localStorage.getItem('saved-login-form')

      if(savedForm){
        const loadedFormDate=JSON.parse(savedForm)
        this.form.patchValue({
          email: loadedFormDate.email
        })
      }
    

    const sub = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email: value.email })
        );
      },
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}

// import {
//   afterNextRender,
//   Component,
//   DestroyRef,
//   inject,
//   viewChild,
// } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { debounceTime } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
//   imports: [FormsModule],
// })
// export class LoginComponent {
//   private form = viewChild.required<NgForm>('form');
//   private destroyRef = inject(DestroyRef);

//   constructor() {
//     afterNextRender(() => {

//       const savedForm=window.localStorage.getItem('saved-login-form')

//       if(savedForm){
//         const loadedFormDate=JSON.parse(savedForm)
//         const savedEmail=loadedFormDate.email
//         setTimeout(()=>{
//           this.form().controls['email'].setValue(savedEmail)
//         },1)

//       }

//       const sub = this.form()
//         .valueChanges?.pipe(debounceTime(500))
//         .subscribe({
//           next: (value) =>
//             window.localStorage.setItem(
//               'saved-login-form',
//               JSON.stringify({ email: value.email })
//             ),
//         });
//       this.destroyRef.onDestroy(() => sub?.unsubscribe);
//     });
//   }

//   onSubmit(formData: NgForm) {
//     if (!formData.form.valid) {
//       return;
//     }

//     const enteredEmail = formData.form.value.email;
//     const enteredPassword = formData.form.value.password;

//     console.log(enteredEmail, enteredPassword);

//     formData.form.reset();
//   }
// }