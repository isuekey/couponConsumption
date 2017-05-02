import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { HttpManager } from '../../manager/httpmanager';
import { AccountInfo, CouponInfo } from '../../domain/system.model';

/**
核销优惠券
**/
@Component({
    selector: 'page-writeoff',
    templateUrl: 'writeoff.html',
    providers:[ BarcodeScanner ]
})
export class Writeoff {
    codeResult:string = "没有结果";

    constructor(private barcodeScanner: BarcodeScanner, private httpManager: HttpManager, private loadingController:LoadingController) { 
    }
    dissmissLoading(loading: Loading):void{
        if(loading){
            loading.dismiss();
        }
    }

        /**
        {"clerk":{"id":1,"account":"admin","accountName":"administrator","phone":"13718961111","password":"123456",
        "createAt":"2017-05-01T08:44:45.209Z","status":"enabled","accountType":"admin"},
        "couponInstance":{"title":"discount","desc":"双安商场全场9折",
        "data":{"count":5,"discount":0.9,"brandName":"双安商场","name":"双安商场全场9折"},"id":4,"price":"双安商场全场9折"}}


        {"clerk":{"id":1,"account":"admin","accountName":"administrator","phone":"13718961111",
          "password":"123456","createAt":"2017-05-01T08:44:45.209Z","status":"enabled","accountType":"admin"},
             "couponInstance":{"name":"discount",
                   "data":{"count":5,"discount":0.9,"brandName":"双安商场","name":"双安商场全场9折"},
                   "id":4}}
                   **/

    beginToWriteOff():void {
        this.barcodeScanner.scan().then((code)=>{
            this.codeResult = code.text;
            let instance:any = JSON.parse(code.text);
            let couponInstance = {
                name: instance.title,
                data: instance.data,
                id: instance.id
            } as CouponInfo;
            console.log('begin to writeOff');
            let loading = this.loadingController.create();
            loading.present();
            this.httpManager.writeOffTheCoupon(couponInstance, AccountInfo.getLocalAccount(), (success)=>{
                console.log(`write off success: ${ JSON.stringify(success)}`);
                this.dissmissLoading(loading);
            }, (error)=>{
                console.log(`write off error: ${ JSON.stringify(error)}`);
                this.dissmissLoading(loading);
            });
        },(error)=>{
            this.codeResult = `there is an error when scanning the code : ${ JSON.stringify(error)} `;
            console.log(this.codeResult);
        })
    }
}

