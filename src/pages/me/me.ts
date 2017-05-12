import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';

import { AccountInfo } from '../../domain/system.model';
import { HttpManager } from '../../manager/httpmanager';

@Component({
    selector: 'me-home',
    templateUrl: 'me.html'
})
export class MePage {
    private accountName:string;
    private accountPassword:string;
    private account:AccountInfo;

    constructor(public navCtrl: NavController, private httpManager: HttpManager, private loadingControler:LoadingController) {
        this.account = AccountInfo.getLocalAccount();
    }

    dissmissLoading(loading: Loading):void{
        if(loading){
            loading.dismiss();
        }
    }

    signIn(){
        let loading = this.loadingControler.create();
        loading.present();
        this.httpManager.loginAccount(this.accountName, this.accountPassword, (success)=>{
            this.dissmissLoading(loading);
            this.getAccountInfo();
        }, (error)=>{
            this.dissmissLoading(loading);
        });
    }

    getAccountInfo(){
        this.httpManager.getAccountInfo((success)=>{
            this.account = AccountInfo.getLocalAccount();
        });
    }

    logOut(){
        this.httpManager.logoutAccount((success)=>{
            this.account = undefined;
        });
    }

}