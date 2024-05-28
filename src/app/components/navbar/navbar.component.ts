import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  flag: boolean = false;
  constructor(
    private _authService: AuthService,
    private _ToastrService: ToastrService
  ) {}

  check() {
    this._authService.userInfo.subscribe({
      next: () => {
        if (this._authService.userInfo.getValue() !== null) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      },
    });
  }
  ngOnInit(): void {
    this.check();
  }

  logout() {
    this._authService.logout();
    this._ToastrService.success('See You Soon', 'BYE BYE');
  }
}
