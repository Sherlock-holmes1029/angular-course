import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


function samePassword(control:AbstractControl){
  const password=control.get('password')?.value
  const confirmPassword=control.get('confirmPassword')?.value
  if(password===confirmPassword){
    return null
  }
  return {passwordsNotEqual:true}
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords:new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    },{
      validators:[samePassword]
    }),
    firstName: new FormControl('', {
      validators: [Validators.minLength(3), Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.minLength(3), Validators.required],
    }),
    address:new FormGroup({
      street: new FormControl('', {
        validators: [Validators.minLength(3), Validators.required],
      }),
      number: new FormControl('', {
        validators: [Validators.minLength(10), Validators.required],
      }),
      postalCode: new FormControl('', { 
        validators: [Validators.minLength(5), Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.minLength(3), Validators.required],
      }),
    }),

    role:new FormControl<'student'|'teacher'|'employee'|'founder'|'other'>('student',{
      validators:[Validators.required]
    }),
    source:new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),

    ]),
    agree:new FormControl(false,{
      validators:[Validators.required]
    })
  });
  onSubmit() {
    if(this.form.invalid){
      console.log('invalid form');
      return 
    }
  }
}
