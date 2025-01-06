import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public wrongPw;

  public loginForm = new FormGroup({
  username: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
  }, {updateOn: 'blur'});

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.wrongPW$.subscribe((wrongPW) => {
      this.wrongPw = wrongPW;
    });
  }

  public login() {
    this.authService.login(this.loginForm.value);
  }

}
