import { Injectable } from '@angular/core';
import { Http,RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Events } from 'ionic-angular';

import { Base64} from './util';
import { CouponInfo, AccountInfo, Location, Consumption, CouponTemplateInstance, TokenInfo, ClerkInfo } from "../domain/system.model";


// export const hostBase = 'http://localhost:10010';
// export const hostBase = 'http://192.168.31.104:10010';
export const hostBase = 'http://192.168.1.102:10010';
export const token = "d819c1b1b73e64f53e0375d0503fa89c5a5d9101";

@Injectable()
export class HttpManager {
    constructor(private http:Http){
    };

    errorHandler = function errorHandler(error, errorFunc?:(error)=>void){
        console.log(error);
        errorFunc && errorFunc(error.json());
    };

    loginAccount(accountName:string, accountPassword:string, successFunc?:((success) => void), errorFunc?:((error)=>void)){
        let url = `${hostBase}/oauth/token`;
        var headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Authorization", "Basic bmluZWNvdXBvbkFkbWluOmM5NjU0MTk5MzY2OTg1");
        let login = [["grant_type","password"],["username", accountName],["password", accountPassword]].map(ele=>ele.join("=")).join("&");
        console.log(login);
        return this.http.post(url, login, {
            method: RequestMethod.Post,
            headers: headers
        }).subscribe((success) => {
            let tokenInfo:TokenInfo = success.json();
            TokenInfo.saveLocalToken(tokenInfo);
            successFunc && successFunc(tokenInfo);
        }, (error) => {
            this.errorHandler(error, errorFunc);
        })
    };

    logoutAccount(successFunc?:((success) => void), errorFunc?:((error)=>void)){
        TokenInfo.removeLocalToken();
        AccountInfo.removeLocalAccount();
        successFunc && successFunc(undefined);
    }

    refreshToken(successFunc?:((suc)=>void), errorFunc?:((err)=>void)){
        let url = `${hostBase}/oauth/token`;
        var headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Authorization", "Basic bmluZWNvdXBvbkFkbWluOmM5NjU0MTk5MzY2OTg1");
        let tokenInfo = TokenInfo.getLocalToken();
        let refresh = [
            ["grant_type","refresh_token"],
            ["refresh_token", tokenInfo.refresh_token],
        ].map(ele=>ele.join("=")).join("&");

        return this.http.post(url, refresh, {
            headers: headers
        }).subscribe((suc)=>{
            successFunc && successFunc(suc);
        }, (err)=>{
            this.errorHandler(err, errorFunc);
        })
    };
    
    getAccountInfo(successFunc?:((success)=> void),errorFunc?:((error)=>void) ){
        let url = `${hostBase}/ninecoupon/account`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.get(url,{headers}).subscribe((suc)=>{
            let accountInfo: AccountInfo = suc.json();
            console.log(accountInfo);
            AccountInfo.saveLocalAccount(accountInfo);
            successFunc && successFunc(accountInfo);
        }, (error)=>{
            this.errorHandler(error, errorFunc);            
        });
    }

    queryMyShopList(successFunc?:((success)=> void),errorFunc?:((error)=>void) ){
        let url = `${hostBase}/ninecoupon/shop/list`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.get(url,{headers}).subscribe((suc)=>{
            successFunc && successFunc(suc.json());
        }, (error)=>{
            this.errorHandler(error, errorFunc);            
        });
    };

    queryClerkListOfTheShop(shopId:number, successFunc?:((success)=> void),errorFunc?:((error)=>void) ){
        let url = `${hostBase}/consumption/shop/${shopId}/clerk/list`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.get(url,{headers}).subscribe((suc)=>{
            successFunc && successFunc(suc.json());
        }, (error)=>{
            this.errorHandler(error, errorFunc);            
        });
    };

    addNewClerk(clerkInfo: ClerkInfo, successFunc?:((success)=> void),errorFunc?:((error)=>void) ){
        let url = `${hostBase}/consumption/clerk`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.post(url,{
            account: clerkInfo.account,
            shop: clerkInfo.shop
        },{headers}).subscribe((suc)=>{
            successFunc && successFunc(suc.json());
        }, (error)=>{
            this.errorHandler(error, errorFunc);            
        });
    };

    queryTemplateListOfTheShop(shopId:number, successFunc?:((success)=> void),errorFunc?:((error)=>void) ){
        let url = `${hostBase}/ninecoupon/shop/${shopId}/template/list`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.get(url,{headers}).subscribe((suc)=>{
            successFunc && successFunc(suc.json());
        }, (error)=>{
            this.errorHandler(error, errorFunc);            
        });
    };








    writeOffTheCoupon(couponInfo:CouponInfo, accountInfo:AccountInfo, successFunc?:((success) => void), errorFunc?:((error)=>void)){
        let url = `${hostBase}/coupon/instance/writeoff/${couponInfo.id}`;
        let consumption = new Consumption();
        consumption.clerk = accountInfo;
        consumption.couponInstance = couponInfo;
        console.log(`start to write off: ${url}`);
        console.log(`put data: ${ JSON.stringify(consumption)}`);
        this.http.put(url, consumption).subscribe((success)=>{
            successFunc && successFunc(success.json());
            console.log(success);
        }, (error) => {
            this.errorHandler(error, errorFunc);
        });
    };

    getWritenOffConsumptionOfTheClerk(accountInfo:AccountInfo, successFunc?:((success) => void), errorFunc?:((error)=>void)){
        let url = `${hostBase}/coupon/instance/${accountInfo.id}/writeoff`;
        this.http.get(url).subscribe((success)=>{
            successFunc && successFunc(success.json());
        }, (error) => {
            this.errorHandler(error, errorFunc);
        });
    };

    generateCouponInstance(accountInfo:AccountInfo, couponTemplate:CouponTemplateInstance, successFunc?:((success) => void), errorFunc?:((error)=>void)){
        let url = `${hostBase}/coupon/instance`;
        this.http.post(url, couponTemplate).subscribe((success)=>{
            successFunc && successFunc(success.json())
        }, (error) => {
            this.errorHandler(error, errorFunc);
        });
    };

}
