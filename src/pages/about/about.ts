import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';

import { HttpManager } from "../../manager/httpmanager";
import { AccountInfo } from "../../domain/system.model";

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    constructor(public navCtrl: NavController, private httpManager:HttpManager, private loadingControler:LoadingController) {
    }

    dissmissLoading(loading: Loading):void{
        if(loading){
            loading.dismiss();
        }
    }

}
