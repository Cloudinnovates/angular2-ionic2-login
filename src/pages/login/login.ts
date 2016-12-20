import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading:Loading;
  registerCredentials = {email: '', password:''};

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private auth:AuthService,
      private alertCtrl : AlertController,
      private loadingCtrl : LoadingController
    ) {}

  createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed=> {
      if (allowed) {
        setTimeout(() => {
          this.loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        })
      }else {
        this.showError('Access Denied');
      }
    },
    error => {
      this.showError(error);
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content:'Please Wait....'
    });
    this.loading.present();
  }

  showError(text){
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title : 'Fail',
      subTitle :text,
      buttons:['OK']
    })
    alert.present(prompt);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
