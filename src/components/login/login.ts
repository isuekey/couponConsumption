import { Component } from '@angular/core';
import { Loading, LoadingController } from "ionic-angular";

import { AccountInfo } from "../../domain/system.model";
import { HttpManager } from "../../manager/httpmanager";


@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    private accountName:string;
    private accountPassword:string;
    private account:AccountInfo;

    constructor(private loadingController:LoadingController, private httpManager:HttpManager) {
        console.log('Hello Login Component');
    }

    dissmissLoading(loading: Loading):void{
        if(loading){
            loading.dismiss();
        }
    }

    signIn(){
        let loading = this.loadingController.create();
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
}
