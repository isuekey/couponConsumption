import { Injectable } from '@angular/core';
import { Http,RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Events } from 'ionic-angular';

import { Base64} from './util';
import { AccountInfo, TokenInfo, ClerkInfo, Strategy, StrategyAccess, CouponData,
 Consumption, CouponInfo, CouponTemplate } from "../domain/system.model";


// export const hostBase = 'http://localhost:10010';
// export const hostBase = 'http://192.168.31.104:10010';
// export const hostBase = 'http://192.168.1.102:10010';
export const hostBase = 'http://192.168.2.104:12000';
// export const hostBase = 'http://192.168.2.105:10010';
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

    queryStrategyAccessOfTheShop(shopId:number, successFunc?:((success)=> void),errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/shop/${shopId}/strategy/list`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.get(url, {headers}).subscribe((suc)=>{
            let accessList = suc.json().map((ele)=>{
                let accessItem = new StrategyAccess();
                accessItem.id = ele.access_id;
                accessItem.strategyId = ele.strategy_id;
                accessItem.shopId = ele.shop_id;
                accessItem.status = ele.access_status;
                let strategy = new Strategy();
                accessItem.strategy = strategy;
                strategy.id = ele.strategy_id;
                strategy.strategyName = ele.strategy_name;
                strategy.status = ele.strategy_status;
                strategy.origin = ele.origin;
                let data = ele.data as CouponData;
                strategy.data = data;
                return accessItem;
            });
            successFunc && successFunc(accessList);
        }, (error)=>{
            this.errorHandler(error, errorFunc);
        });
    };

    addNewTemplate(templateInfo:CouponTemplate, successFunc?:((success) => void), errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/template/create`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        this.http.post(url, templateInfo, {headers}).subscribe((success)=>{
            successFunc && successFunc(success.json());
        }, (error) => {
            this.errorHandler(error, errorFunc);
        });
    };

    publishTemplate(templateId:number, successFunc?:((success) => void), errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/template/${templateId}/publish`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        this.http.put(url, {}, {headers}).subscribe((success)=>{
            successFunc && successFunc(success.json());
        }, (error) => {
            this.errorHandler(error, errorFunc);
        });
    };

    queryMyShopWorkList(successFunc?:((success) => void), errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/shop/work/list`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        this.http.get(url, {headers}).subscribe((success)=>{
            successFunc && successFunc(success.json());
        }, (error) => {
            this.errorHandler(error, errorFunc);
        });
    };

    queryMyWriteOffConsumption(shopId:number, successFunc?:((success) => void), errorFunc?:((error)=>void)){
        let url = `${hostBase}/consumption/shop/${shopId}/writeoff/list`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        this.http.get(url, {headers}).subscribe((success)=>{
            successFunc && successFunc(success.json());
        }, (error) => {
            this.errorHandler(error, errorFunc);
        });
    };

    writeOffTheCoupon(couponInfo:CouponInfo,  successFunc?:((success) => void), errorFunc?:((error)=>void)){
        let url = `${hostBase}/consumption/writeoff/coupon`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        this.http.post(url, couponInfo, {headers}).subscribe((success)=>{
            successFunc && successFunc(success.json());
        }, (error) => {
            this.errorHandler(error, errorFunc);
        });
    };





}
