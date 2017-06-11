import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private _authService: AuthenticationService, private _router: Router) { }

  ngOnInit() {
  }

  @Output() onLoginSuccess = new EventEmitter();

  username: string;
  password: string;
  login() {
    if (this._authService.login(this.username, this.password)) {
      this._router.navigate(['/learn']);
    }
  }

}
