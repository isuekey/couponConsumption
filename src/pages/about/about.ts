import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';

import { HttpManager } from "../../manager/httpmanager";
import { CouponTemplateInstance, AccountInfo } from "../../domain/system.model";

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

    generatorCoupon():void {
        let loading = this.loadingControler.create();
        loading.present();
        let accountInfo = AccountInfo.getLocalAccount();
        let couponTemplate = {
            "id": 1,
            "name": "discount",
            "data": {
                "count":20,"discount":0.9,"brandName":"双安商场","name":"双安商场全场9折"
            },
            "status": "enabled",
            "publishType": "suyuan",
            "templateInfo": {
                "id": 1,
                "name": "discount",
                "data": {
                    "discount":0.9,"name":"全场9折"
                }
            },
            "brand": {
                "id": 1,
                "name": "xxxx"
            }
        } as CouponTemplateInstance;
        this.httpManager.generateCouponInstance(accountInfo, couponTemplate, (success)=>{
            this.dissmissLoading(loading);
        }, (error)=>{
            this.dissmissLoading(loading);
        })
    }
}
