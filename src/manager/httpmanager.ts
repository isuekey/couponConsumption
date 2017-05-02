import { Injectable } from '@angular/core';
import { Http,RequestOptions, Headers } from '@angular/http';
import { Events } from 'ionic-angular';

import { Base64} from './util';
import { CouponInfo, AccountInfo, Location, Consumption, CouponTemplateInstance } from "../domain/system.model";

// export const hostBase = 'http://localhost:10010';
export const hostBase = 'http://192.168.31.104:10010';

@Injectable()
export class HttpManager {
    constructor(private http:Http){
    };

    errorHandler = function errorHandler(error, errorFunc?:(error)=>void){
        console.log(error);
        errorFunc && errorFunc(error.json());
    };

    loginAccount(accountName:string, accountPassword:string, successFunc?:((success) => void), errorFunc?:((error)=>void)){
        let url = `${hostBase}/account/signin`;
        let login = {
            account: accountName,
            password: accountPassword
        }
        let options = new RequestOptions({
            headers: new Headers({
                "Accept": "application/json"
            })
        });
        this.http.post(url, login, options).subscribe((success) => {
            successFunc && successFunc(success.json());
        }, (error) => {
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
