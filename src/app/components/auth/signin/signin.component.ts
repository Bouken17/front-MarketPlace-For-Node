import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private router: Router,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmit(): void{
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.authService.signIn(email, password)
      .then(
        () => {
          this.router.navigate(['/shop']);
        })
      .catch(
        (error) => {
          this.errorMessage = error.message;
        }
      );
  }

}
