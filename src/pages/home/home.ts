import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';

import { HttpManager } from "../../manager/httpmanager";
import { AccountInfo } from "../../domain/system.model";
import { ShopInfo } from "../../domain/shop.model";
import { ClerklistComponent } from "../clerklist/clerklist";
import { TemplatelistComponent } from "../templatelist/templatelist";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private myShopList:ShopInfo[] = [];
    private shopRefresher:Refresher;
    constructor(public navCtrl: NavController, private httpManager:HttpManager) {
    }

    refreshMyShop(refresher){
        this.shopRefresher = refresher;
        this.getMyShopList();
    };

    stopRefresh(){
        if(this.shopRefresher){
            this.shopRefresher.complete();
        };
    };

    getMyShopList(){
        this.httpManager.queryMyShopList( (success)=>{
            this.myShopList.length = 0;
            Array.prototype.push.apply(this.myShopList, success);
            this.stopRefresh();
        }, (error)=>{
            this.stopRefresh();
        });
    }
    manageClerk(shopItem:ShopInfo){
        console.log(shopItem.id);
        this.navCtrl.push(ClerklistComponent, {
            shopId: shopItem.id
        });
    };

    manageCouponTemplate(shopItem:ShopInfo){
        this.navCtrl.push(TemplatelistComponent, {
            shopId: shopItem.id
        });
    };
}
