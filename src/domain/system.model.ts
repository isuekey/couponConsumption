import { Base64 } from "../manager/util";

export class AccountInfo {
    id:number;
    account:string;
    account_name:string;
    phone:string;
    gender:number;
    avatar:string;
    accountType:string;

    public static getLocalAccount(): AccountInfo {
        let base64Account = localStorage.getItem("account");
        if (base64Account) {
            return JSON.parse(Base64.decode(base64Account));
        }
    }

    public static saveLocalAccount(accountInfo:AccountInfo): void{
        if(accountInfo){
            let infoString = JSON.stringify(accountInfo);
            localStorage.setItem("account", Base64.encode(infoString));
        }
    }

    public static removeLocalAccount():void{
        localStorage.removeItem("account");
    }

}

export class TokenInfo{
    token_type:string;
    access_token: string;
    expires_in: number;
    refresh_token: string;

    public static getLocalToken(): TokenInfo{
        let tokenString = localStorage.getItem("token");
        if(tokenString){
            return JSON.parse(tokenString);
        }
    }

    public static saveLocalToken(tokenInfo: TokenInfo): void{
        if(tokenInfo){
            let infoString = JSON.stringify(tokenInfo);
            localStorage.setItem("token", infoString);
        };
    }

    public static removeLocalToken():void{
        localStorage.removeItem("token");
    }
};

export class ClerkInfo {
    id: number;
    parent:number;
    account: string;
    accountName: string;
    status: string;
    relationType: string;
    shop:number;
}

export class CouponTemplate{
    id:number;
    name:string;
    data:CouponData;
    strategyId:number;
    shopId:number;
    status:string;
    origin:string;
    publish:number;
}
export class Brand{
    id:number;
    name:string;
}
export class CouponTemplateInstance {
    id:number;
    name:string;
    data:CouponData;
    status:string;
    publishType:string;
    templateInfo: CouponTemplate;
    brand: Brand;
}
export class CouponInfo{
    name:string;
    data:CouponData;
    id: number;
}

export class Location{
    longitude:number;
    latitude:number;
}
export class Consumption{
    id:number;
    location:Location;
    clerk:AccountInfo;
    couponInstance:CouponInfo
}
export class CouponData{
    name:string;
    brandName:string;
    discount:number;
    count:number;
}
