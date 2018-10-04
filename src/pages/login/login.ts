import { Component } from '@angular/core';
import {App, IonicPage, LoadingController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import { auth } from 'firebase/app';
import {AngularFireAuth} from "angularfire2/auth";
import {AlertServiceProvider} from "../../providers/alert-service/alert-service";
import {UserDataProvider} from "../../providers/user-data/user-data";
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  error = null;
  fbScope = [];
  loading: any;
  termsAgree = true;
  newAccCredential: any;
  authAlreadyExists = 'auth/account-exists-with-different-credential';

  constructor(public app: App,
              public facebook: Facebook,
              private google: GooglePlus,
              public afAuth: AngularFireAuth,
              private loadingCtrl: LoadingController,
              public alertService: AlertServiceProvider) {

    this.fbScope = ['public_profile', 'email'];

  }

  fbSign() {
    this.loading = this.loadingCtrl.create({content: 'Conectando ao Facebook...'});
    this.loading.present();

    try {
      if(window['cordova']) {
        // Call native FB LogIn
        let fbPromise = this.facebook.login(this.fbScope);
        this.alertResolveSign(fbPromise, 'facebook');
      } else {
        this.fbPopup();
      }
    } catch(error) {
      this.fbPopup();
    }
  }

  googleSign() {
    this.loading = this.loadingCtrl.create({content: 'Conectando ao Google...'});
    this.loading.present();
    let promise = null;

    try {
      if(window['cordova']) {
        // Call native Google LogIn
        promise = this.google.login({
          'webClientId': '529768920516-3u7uptmr2ulo3ura4uen606ma8pbpf2m.apps.googleusercontent.com',
          'scopes': 'profile email',
          'offline': true
        });

        this.alertResolveSign(promise, 'google');
      } else {
        promise = this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        this.alertResolveSign(promise, 'google');
      }
    } catch(error) {
      console.log('catch', error);
      if(window['cordova']) this.alertResolveSign(promise, 'google');
      promise = this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
      this.alertResolveSign(promise, 'google');
    }
  }

  alertResolveSign(promise: any, provider: string) {
    promise.then(auth => {
      let profile = null;

      if(provider == 'facebook' && auth['authResponse'] && !auth['user']) {
        this.signFBNative(auth);
      } else if (provider == 'google' && window['cordova']) {
        this.signGNative(auth);
      } else {
        profile = this.signFBWeb(auth);
        UserDataProvider.setProfile(profile);

        if(!this.newAccCredential) {
          this.loading.dismiss();
          this.goToApp();
        }
      }

      this.linkAccounts(auth.credential);
    })
      .catch(err => {
        // Handle USER sign error
        this.error = err;
        if(err.code === this.authAlreadyExists) {
          this.setupAlreadyExistAcc(err);
          return;
        }

        this.loading.dismiss();
        let message = `Oops, algo deu errado. Tente novamente! ${err.code}`;

        switch (err.code) {
          case 'user-data/wrong-password':
            message = 'Sua senha está incorreta. Tente novamente.';
            break;
          case 'user-data/user-not-found':
            message = 'Usuário não encontrado. Cadastre-se para poder acessar.';
            break;
          case 'user-data/email-already-in-use':
            message = 'Este e-mail já está em uso. Você já possui conta, clique em JÁ TENHO CONTA para acessar.';
            break;
          case 'user-data/invalid-email':
            message = 'O e-mail informado não é válido. Por favor, verifique.';
            break;
          case 'auth/popup-blocked':
            message = 'Não foi possível abrir a tela de login externo. Error: auth/popup-blocked.';
            break;
          default:
            message = `Não foi possível abrir tela desejada. Error: ${err.code || JSON.stringify(err)}`;
        }

        if(err.errorCode == '4201') message = 'Você cancelou o LogIn Social';
        this.alertService.show('Erro', message, ['OK']);
      });
  }

  private goToApp() {
    let nvc = this.app.getRootNav();
    nvc.setRoot(TabsPage);
    nvc.popToRoot();
    location.reload();
  }

  private signFBWeb(resp) {
    // Auth-Response
    UserDataProvider.set(resp);

    return {
      name: resp.user.displayName,
      email: resp.user.email,
      photo: resp.user.photoURL,
      phone: resp.user.phone,
      createdAt: null
    };
  }

  private signGNative(gResp) {
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(gResp.idToken);
    firebase.auth().signInAndRetrieveDataWithCredential(googleCredential)
      .then(fireAuthResp => {
        let newFar = JSON.parse(JSON.stringify(fireAuthResp));

        if(!newFar.user['photoURL']) newFar.user['photoURL'] = gResp['imageUrl'];
        if(!newFar.user['displayName']) newFar.user['displayName'] = gResp['displayName'];
        if(!newFar.user['phoneNumber']) newFar.user['phoneNumber'] = gResp['phoneNumber'];

        // SocialProfile = far.additionalUserInf.profile
        let profile = {
          uid: newFar.user.uid,
          name: newFar.user.displayName,
          email: newFar.user.email,
          photo: newFar.user.photoURL,
          phone: newFar.user.phoneNumber
        };

        this.linkAccounts(googleCredential);
        UserDataProvider.setProfile(profile);
        UserDataProvider.set(newFar); //auth
        this.loading.dismiss();
        this.goToApp();
      })
      .catch(error => {
        window['gErrors'] = error;
        this.loading.dismiss();
        this.alertService.showToast('Erro ao tentar fazer seu cadastro com login Google');
        if(error.code == this.authAlreadyExists) this.setupAlreadyExistAcc(error);
      });
  }

  private signFBNative(fbResp) {
    let authResponse = fbResp.authResponse;

    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(authResponse.accessToken);
    firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
      .then(fireAuthResp => {
        // SocialProfile = far.additionalUserInf.profile
        let far = fireAuthResp;
        let profile = {
          name: far.user.displayName,
          email: far.user.email,
          photo: far.user.photoURL,
          phone: far.user.phoneNumber
        };

        this.linkAccounts(facebookCredential);
        UserDataProvider.setProfile(profile);
        UserDataProvider.set(far); //auth
        this.loading.dismiss();
        this.goToApp();
      })
      .catch(error => {
        this.error = error;
        this.error['fbToken'] = facebookCredential;
        window['fErrors'] = this.error;
        console.log('Firebase Sign Error: ', error);

        this.loading.dismiss();
        if(error.code == this.authAlreadyExists) {
          this.setupAlreadyExistAcc(error);
          this.alertService.showToast('Este e-mail já possui uma conta via Google, vincule suas contas (merge your accounts)');
        } else {
          this.alertService.showToast('Erro ao tentar fazer seu cadastro com o Facebook');
        }
      });
  }

  private fbPopup() {
    // if no cordova, so popup the facebook sign page on browser
    let promise = this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    this.alertResolveSign(promise, 'facebook');
  }

  private setupAlreadyExistAcc(err) {
    firebase.auth().fetchSignInMethodsForEmail(err.email)
      .then(providers => {
        let provider = providers[0];
        let yesBtn = {
          text: 'Sim',
          handler: () => {
            this.newAccCredential = err.credential;
            if (provider === 'google.com') this.googleSign();
            else if (provider === 'facebook.com') this.fbSign();
          }
        };

        let noBtn = {
          text: 'Não'
        };

        let message = `Você já possui uma conta com este e-mail usando o ${provider}. Você deseja linkar as duas contas como sendo uma?`;
        this.alertService.show('ALERTA', message, [noBtn, yesBtn]);
      }).catch(error => this.default(`Você já possui uma conta com este e-mail, porém não foi possível identificar qual a forma de acesso. ${error}`));

    this.loading.dismiss();
  }

  private default(error) {
    window['defaultError'] = error;
    let message = `Não foi possível efetuar seu login. Error: ${error}`;
    this.alertService.show('Erro', message, ['OK']);
  }

  private linkAccounts(authCredential) {
    if(this.newAccCredential && authCredential) {
      window['hasCredential'] = true;
      firebase.auth().signInWithCredential(authCredential)
        .then(user => {
          user.linkWithCredential(this.newAccCredential)
            .then(resp => {
              console.log(resp);
              this.alertService.showToast('Conta linkada com sucesso');
              this.loading.dismiss();
              this.goToApp();
            })
            .catch(error => {
              this.alertService.showToast(`Conta não linkada ${error}`, );
              this.loading.dismiss();
            });
        });
    }
  }

}
