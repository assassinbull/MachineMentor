import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../providers/providers';
import { Common } from '../../providers/providers';
import { MainPage } from '../pages';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: FormGroup;
  account: { Username: string, Email: string, Password: string } = {
    Username: 'TestUser',
    Email: 'test@example.com',
    Password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController, public user: User, public common: Common
    , public translateService: TranslateService, private formBuilder: FormBuilder) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })

    this.signupForm = formBuilder.group({
      //firstName: ['', Validators.compose([Validators.maxLength(5), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['Required!', Validators.required],
      username: ['Required!', Validators.required]
    });
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp: any) => {
      if (resp.Status == 'success')
        this.navCtrl.push('LoginPage');
      else
        this.common.popToastErrResp(resp);
    }, (err) => {
      // Unable to sign up
      this.common.popToast(this.signupErrorString);
    });
  }
}
