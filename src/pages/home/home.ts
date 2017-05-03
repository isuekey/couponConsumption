import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';

import { HttpManager } from "../../manager/httpmanager";
import { Consumption, AccountInfo } from "../../domain/system.model";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private couponWrittenOffList:Consumption[] = [];
    private couponRefresher:Refresher;
    constructor(public navCtrl: NavController, private httpManager:HttpManager) {
    }

    refreshTheCouponList(refresher){
        this.couponRefresher = refresher;
        this.getCouponWritenOffList();
    };

    stopRefresh(){
        if(this.couponRefresher){
            this.couponRefresher.complete();
        };
    };

    getCouponWritenOffList(){
        let accountInfo = AccountInfo.getLocalAccount();
        if(!accountInfo){
            // 跳转登录
            this.stopRefresh();
            return;
        }
        this.httpManager.getWritenOffConsumptionOfTheClerk(accountInfo, (success)=>{
            this.couponWrittenOffList.length = 0;
            Array.prototype.push.apply(this.couponWrittenOffList, success);
            this.stopRefresh();
        }, (error)=>{
            this.stopRefresh();
        });
    }
}
