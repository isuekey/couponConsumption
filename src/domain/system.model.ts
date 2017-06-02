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
};

export class CouponTemplate{
    id:number;
    name:string;
    data:CouponData;
    strategyId:number;
    shopId:number;
    status:string;
    origin?:string;
    maxcount?:number;
    publish?:number;
    beginTime?:string;
    endTime?:string;
};


export class Strategy{
    id: number;
    strategyName: string;
    data: CouponData;
    status: string;
    origin: string;
}

export class CouponData{
    title?:string;
    desc?:string;
    offset?: number;
    consumption?: number;
    discount?:number
}

export class StrategyAccess{
    id: number;
    strategyId: number;
    shopId: number;
    status: string;
    strategy: Strategy;
}

export class CouponInfo{
    id:number;
    name:string;
    data:CouponData;
    account:string;
    status:string;
    templateId: number;
    shopId: number;
    shopName: string;
    shopAddress: string;
    origin: string;
    created_at: string;
    updated_at: string;
}

export class Consumption{
    id:number;
    clerk: string;
    consumer:string;
    instanceId:number;
    shopId:number;
    created_at:string;
    updated_at:string;
}

export const EVENT_CONSTANTS = {
    TOKEN_REFRESH_SUCCESS : "TOKEN_REFRESH_SUCCESS",
    TOKEN_REFRESH_FAIL : "TOKEN_REFRESH_FAIL",
    ACCOUNT_NEED_LOGIN: "ACCOUNT_NEED_LOGIN"
}


