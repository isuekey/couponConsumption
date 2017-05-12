import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpManager } from "../../manager/httpmanager";

import { CouponTemplate } from "../../domain/system.model";

@Component({
    selector: 'page-templatelist',
    templateUrl: 'templatelist.html',
})
export class TemplatelistComponent {

    templateList:CouponTemplate[] = [];
    shopId:number;
    beginToAddNewTemplate:boolean;
    newTemplate:CouponTemplate;

    constructor(public navCtrl: NavController, public navParams: NavParams, private httpManager:HttpManager ) {
        this.shopId = this.navParams.get("shopId");
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Templatelist');
    }

    ionViewDidEnter(){
        this.newTemplate = new CouponTemplate();

    }

    queryTemplateListOfTheShop(){
        this.httpManager.queryTemplateListOfTheShop(this.shopId, (success)=>{
            this.templateList.length = 0;
            Array.prototype.push.apply(this.templateList, success);
        });
    }

    wantToAddNewTemplate(){
        this.beginToAddNewTemplate = !this.beginToAddNewTemplate;
    }
}
