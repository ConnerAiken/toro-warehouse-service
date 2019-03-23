import https from "https";
import utils from "./utils";  
import path from "path";
import dotenv from "dotenv";  
import Auth from "./auth";

export default class Stocks {
    construtor() {
        this.auth = new Auth(); 
    }

    getStock(method, url) { 
        const req = https.request(this.auth.buildRequestUrl(method, url), function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                var parsed = JSON.parse(chunk);
                console.log(parsed);
            });
        });
        req.end();
    }
}