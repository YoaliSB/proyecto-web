import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from "@angular/router";
import { UserServiceService } from '../../services/user-service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { RxwebValidators, RxFormBuilder } from '@rxweb/reactive-form-validators';
//import { MatchPwdValidator } from '../../models/match-pwd-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userModel = new User('nombre','example@mail.com','*****');

  registerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });

  constructor(private rest: UserServiceService, private formBuilder: FormBuilder) { 
    this.createForm();
  }

  createForm(){
    this.registerForm = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8),RxwebValidators.compare({fieldName: 'confirmPassword'})]),
      confirmPassword: new FormControl('',[Validators.required,Validators.minLength(8),RxwebValidators.compare({fieldName: 'password'})])
    })
  }

  enviarFormulario(){
    let forma = this.registerForm.value;
    this.userModel.mail = this.registerForm.value.email;
    this.userModel.pwd = this.registerForm.value.password;
  }

  ngOnInit() {
  	this.getUser();
  }

  getUser(){
    this.rest.getMaJson().subscribe((data: any) => {
      console.log(data);
   });
  }

  get email():any{
    return this.registerForm.get('email');
  }

  get password():any{
    return this.registerForm.get('password');
  }

  get confirmPassword():any{
    return this.registerForm.get('confirmPassword');
  }

  get usuarioActual(){
    return JSON.stringify(this.userModel);
  }

}
