import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _toastrService: ToastrService
  ) {}

  errorMsg: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/),
    ]),
  });

  login(data: FormGroup) {
    this._AuthService.signIn(data.value).subscribe({
      next: (res) => {
        if (res.msg == 'done') {
          localStorage.setItem('userToken', res.token);
          this._AuthService.getProfile();
          this._Router.navigate(['/home']);
        }
      },
      error: (err) => {
        //  this.errorMsg = err.error.message
        console.log(err);
      },
      complete: () => {
        this._toastrService.success('LogIn Successfully');
      },
    });
  }
}
