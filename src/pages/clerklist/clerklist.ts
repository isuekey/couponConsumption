import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { HttpManager } from "../../manager/httpmanager";
import { ShopInfo } from "../../domain/shop.model";
import { ClerkInfo } from "../../domain/system.model";

@Component({
    selector: 'page-clerklist',
    templateUrl: 'clerklist.html',
})
export class ClerklistComponent {

    shopId:number;
    clerkList: ClerkInfo[] = [];
    newClerk: ClerkInfo = new ClerkInfo();
    beginToAddNewClerk:boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, private httpManager:HttpManager) {
        this.shopId = this.navParams.get("shopId");
    }

    ionViewDidLoad() {
        console.log(this.shopId);
        console.log('ionViewDidLoad Clerklist');
    }

    ionViewDidEnter(){
        this.queryMyShopList();
    }
    queryMyShopList(){
        this.httpManager.queryClerkListOfTheShop(this.shopId, (success)=>{
            Array.prototype.push.apply(this.clerkList, success);
        });
    } 

    wantToAddNewClerk(){
        this.beginToAddNewClerk = !this.beginToAddNewClerk;
    };

    addNewClerk(){
        this.newClerk.shop = this.shopId;
        this.httpManager.addNewClerk(this.newClerk, (success)=>{
            this.queryMyShopList();
        })
    }
}
