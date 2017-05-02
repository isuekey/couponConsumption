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

}
export class CouponTemplate{
    id:number;
    name:string;
    data:CouponData;
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
