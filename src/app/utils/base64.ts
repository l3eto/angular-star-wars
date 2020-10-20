export class Base64 {
    static keyStr: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    static encode: Function = (input: string) => {
        let output: string = "";
        let chr1: number, chr2: number, chr3: number = 0;
        let enc1: number, enc2: number, enc3: number, enc4: number = 0;
        let i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                Base64.keyStr.charAt(enc1) +
                Base64.keyStr.charAt(enc2) +
                Base64.keyStr.charAt(enc3) +
                Base64.keyStr.charAt(enc4);
        } while (i < input.length);
        return output;
    };
    static decode: Function = (input: string) => {
        let output: string = "";
        let chr1: number, chr2: number, chr3: number = 0;
        let enc1: number, enc2: number, enc3: number, enc4: number = 0;
        let i = 0;
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            //window.alert("There were invalid base64 characters in the input text.\n" +
                //"Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                //"Expect errors in decoding.");
            console.log('error');
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do {
            enc1 = Base64.keyStr.indexOf(input.charAt(i++));
            enc2 = Base64.keyStr.indexOf(input.charAt(i++));
            enc3 = Base64.keyStr.indexOf(input.charAt(i++));
            enc4 = Base64.keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        } while (i < input.length);
        return output;
    };
}