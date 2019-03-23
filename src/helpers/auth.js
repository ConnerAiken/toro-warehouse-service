import moment from "moment";
import crypto from "crypto"; 
import path from "path";
import dotenv from "dotenv"; 
import utils from "./utils";  
 
global.path = path;
global.dotenv = dotenv; 
utils.loadENV();

export default class Auth { 
    constructor() {   
        this.requestUrl = '';
        this.method = 'GET';
        this.host =  'cloud.iexapis.com';
        this.access_key = process.env.IEX_PUBLIC_KEY;
        this.secret_key = process.env.IEX_SECRET_KEY;  
        this.dates = {};
        this.dates.ts = moment.utc();
        this.dates.iexdate = this.dates.ts.format("YYYYMMDDTHHmmss") + 'Z';
        this.dates.datestamp = this.dates.ts.format("YYYYMMDD");  
        this.options = this.getDefaultOptions(); 
        this.verifyKeys();  
    }  

    getDefaultOptions(uri = '/', queryString = 'param=1') {
        return {
            host: this.host,
            port: 443,
            path: uri + "?" + queryString,
            method: 'GET',
            headers: this.requestHeaders
        }
    }

    verifyKeys() { 
        if (!this.secret_key || !this.access_key) {
            console.warn('No access key is available.signToken')
            process.exit(1);
        }
    }
    
    buildRequestUrl(method, base) {
        return method + '\n' + 
                                  base + '\n' + 
                                  this.tokenString + '\n' + 
                                  this.canonicalHeaders + '\n' + 
                                  this.signedHeaders + '\n' + 
                                  this.payloadHash;
    }
 
    signToken(data) {
        return crypto.createHmac('sha256', this.secret_key).update(data, "utf8").digest('hex');
    };
    
    get signatureKey() { 
        const signedDate = this.signToken(this.secret_key, this.dates.datestamp); 
        return this.signToken(signedDate, 'iex_request');
    }

    get canonicalHeaders() { 
        return 'host:' + this.host + '\n' + 'x-iex-date:' + this.iexdate + '\n';
    } 

    get credScope() {
        return this.dates.datestamp + '/' + 'iex_request';
    }
    get payloadHash() {
        return crypto.createHash('sha256').update('').digest('hex');
    }

    get stringToSign() {
        return this.algorithm + '\n' +  
               this.dates.iexdate + '\n' +  
               this.credScope + '\n' + 
                crypto.createHash('sha256')
                        .update(this.requestUrl, "utf8")
                        .digest('hex');
                                  
    }

    get key() { 
        return this.signToken(this.secret_key, this.dates.datestamp);
    }

    get requestHeaders() {
        return {'x-iex-date': this.iexdate, 'Authorization': this.authHeader};
    }

    get authHeader() { 
        return `${this.algorithm} Credential=${this.access_key}/${this.credScope},SignedHeaders=${this.signedHeaders}, Signature=${this.signature}`; 
    }

    get signature() {
        return crypto.createHmac('sha256', this.key)
                     .update(this.stringToSign, "utf8")
                     .digest('hex');              
    }
 
    get algorithm() {
        return 'IEX-HMAC-SHA256';
    }
    get signedHeaders() {
        return 'host;x-iex-date';
    }

    get tokenString() {
        return 'token=' + this.access_key;
    }
    
}