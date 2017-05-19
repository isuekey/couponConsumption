import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,Loading,AlertController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AccountInfo, CouponInfo, Consumption } from '../../domain/system.model';
import { HttpManager } from "../../manager/httpmanager";
import { ShopInfo } from "../../domain/shop.model";

@Component({
    selector: 'page-writeoff',
    templateUrl: 'writeoff.html',
    providers:[ BarcodeScanner ]
})
export class WriteoffComponent {
    codeResult:string = "没有结果";
    shopInfo:ShopInfo = new ShopInfo();
    consumptionList:Consumption[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner:BarcodeScanner,
     private loadingController:LoadingController, private httpManager:HttpManager, private alertController:AlertController) {
        this.shopInfo.id = this.navParams.get("id");
        this.shopInfo.areaIndex = this.navParams.get("areaIndex");
        console.log(this.shopInfo);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Writeoff');
        this.queryMyConsumptionList();
    }

    dissmissLoading(loading: Loading):void{
        if(loading){
            loading.dismiss();
        }
    };
    queryMyConsumptionList():void{
        this.httpManager.queryMyWriteOffConsumption(this.shopInfo.id, (success)=>{
            console.log(success);
            this.consumptionList.length = 0;
            Array.prototype.push.apply(this.consumptionList, success);
        });
    };

    showAlertError(alertInfo?:{title?:string, subTitle:string, buttons:string[]}){
        let defaultInfo = {
            title: '提示',
            subTitle: "这不是本店的优惠券",
            buttons: ["确定"]
        };
        let alert = this.alertController.create(alertInfo || defaultInfo);
        alert.present();
    };

    beginToWriteOff():void {
        this.barcodeScanner.scan().then((code)=>{
            let data = JSON.parse(code.text);
            let couponInstance =  data as CouponInfo;
            let loading = this.loadingController.create();
            loading.present();
            if(data.shopId != this.shopInfo.id){
                this.showAlertError();
                this.dissmissLoading(loading);
                this.codeResult = JSON.stringify(code);
                return;
            }
            this.httpManager.writeOffTheCoupon(couponInstance, (success)=>{
                this.dissmissLoading(loading);
                if(success.code){
                    this.codeResult = JSON.stringify(success);
                    this.showAlertError({
                        title:"提示",
                        subTitle:`${success.code} ${success.message}`,
                        buttons:["确定"]
                    });
                }else{
                    this.codeResult = "";
                    this.queryMyConsumptionList();
                }
            }, (error)=>{
                console.log(`write off error: ${ JSON.stringify(error)}`);
                this.dissmissLoading(loading);
            });
        },(error)=>{
            this.codeResult = `there is an error when scanning the code : ${ JSON.stringify(error)} `;
            console.log(this.codeResult);
        })
    };


}
