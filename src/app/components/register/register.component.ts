import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _toastrService: ToastrService
  ) {}

  getRegisterData: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/),
    ]),
    age: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  register(registerData: FormGroup) {
    this._AuthService.signUp(registerData.value).subscribe({
      next: (res) => {
        if (res.msg == 'done') {
          this._Router.navigate(['/login']);
        }
      },
      error: (err) => {
        this._toastrService.error(err.error.msg);
      },
      complete: () => {
        this._toastrService.success('Register Successfully');
      },
    });
  }
}
