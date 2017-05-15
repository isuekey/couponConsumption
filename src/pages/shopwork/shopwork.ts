import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { HttpManager } from '../../manager/httpmanager';
import { AccountInfo, CouponInfo } from '../../domain/system.model';
import { ShopInfo } from "../../domain/shop.model";
import { WriteoffComponent } from '../writeoff/writeoff';

/**
核销优惠券
**/
@Component({
    selector: 'page-shopwork',
    templateUrl: 'shopwork.html'
})
export class ShopWorkComponent {
    shopList: ShopInfo[] = [];

    constructor(private navController: NavController, private httpManager: HttpManager) { 
    }

    ionViewDidEnter(){
        this.queryMyWorkShop();
    };

    queryMyWorkShop():void{
        this.httpManager.queryMyShopWorkList((success)=>{
            this.shopList.length = 0;
            Array.prototype.push.apply(this.shopList, success.map(ele =>{
                return {
                    id: ele.id,
                    name: ele.shopname,
                    owner: ele.owneraccount,
                    areaIndex: ele.areaindex,
                    ownerId: ele.ownerid,
                    area: ele.areaid
                }
            }));
        })
    };
    registerThisShopToWork(shopItem:ShopInfo){
        this.navController.push(WriteoffComponent, shopItem);
    };
}






