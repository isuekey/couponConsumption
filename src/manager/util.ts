
export class Base64 {
    static encode(input) {
        return btoa(encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, function(matach,p1){
            return String.fromCharCode(parseInt('0x'+p1, 16));
        }));
    };
    static decode(input){
        return decodeURIComponent(Array.prototype.map.call(atob(input), function(c){
            return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };
}