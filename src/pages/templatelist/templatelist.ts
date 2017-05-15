import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpManager } from "../../manager/httpmanager";

import { CouponTemplate, StrategyAccess, CouponData } from "../../domain/system.model";

@Component({
    selector: 'page-templatelist',
    templateUrl: 'templatelist.html',
})
export class TemplatelistComponent {

    templateList:CouponTemplate[] = [];
    shopId:number;
    beginToAddNewTemplate:boolean;
    newTemplate:CouponTemplate;
    accessList:StrategyAccess[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private httpManager:HttpManager ) {
        this.shopId = this.navParams.get("shopId");
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Templatelist');
        this.queryStrategyAccessOfTheShop();
    }

    ionViewDidEnter(){
        this.clearToAddNewTemplate();
    }

    queryTemplateListOfTheShop(){
        this.httpManager.queryTemplateListOfTheShop(this.shopId, (success)=>{
            this.templateList.length = 0;
            Array.prototype.push.apply(this.templateList, success);
        });
    };
    queryStrategyAccessOfTheShop(){
        this.httpManager.queryStrategyAccessOfTheShop(this.shopId, (success)=>{
            this.accessList.length = 0;
            Array.prototype.push.apply(this.accessList, success);
        });
    }

    wantToAddNewTemplate(){
        this.beginToAddNewTemplate = !this.beginToAddNewTemplate;
    }

    addNewTemplate(){
        this.newTemplate.shopId = this.shopId;
        this.httpManager.addNewTemplate(this.newTemplate, (success)=>{
            this.clearToAddNewTemplate();
        });
    };
    clearToAddNewTemplate(){
        this.newTemplate = new CouponTemplate();
        this.newTemplate.data = new CouponData();
        this.queryTemplateListOfTheShop();
    }
    onChangeAccess(changedValue){
        if(!changedValue) return;
        let selectedAccess = this.accessList.find((ele)=>{
            return ele.strategyId == changedValue;
        });
        this.newTemplate.name = selectedAccess.strategy.strategyName;
        this.newTemplate.data.title = selectedAccess.strategy.data.title;
        this.newTemplate.data.desc = selectedAccess.strategy.data.desc;
        this.newTemplate.data.offset = selectedAccess.strategy.data.offset;
        this.newTemplate.data.consumption = selectedAccess.strategy.data.consumption;
    };

    preparePublishingTemplate(templateInfo: CouponTemplate){
        this.httpManager.publishTemplate(templateInfo.id, (success)=>{
            if(success){
                templateInfo.publish = 1000;
            }
        });
    }
}
