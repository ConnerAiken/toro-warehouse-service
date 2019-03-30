#!/usr/bin/env node    
import _ from "lodash";
const iex = require('iexcloud_api_wrapper'); 
import Db from './helpers/db.js';
var Promise = require("bluebird");
global.db = new Db(); 

db.client.connect().then(result => { 
    return iex.marketSymbols(); 
     
    //let news = await Promise.all(symbols.map(symbol => iex.news(symbol)));
    //let socialSentiment = await Promise.all(symbols.map(symbol => iex.socialSentiment(symbol)));
    //let ceoCompensation = await Promise.all(symbols.map(symbol => iex.ceoCompensation(symbol)));
    //console.log("Fetched CEO Compensation");
    //let quoteData = await Promise.all(symbols.map(symbol => iex.quote(symbol)));
    //console.log("Fetched Quote Data"); 

    // console.log("Updated Company Info");
    // await Promise.all(quoteData.map(quote => db.query(`INSERT INTO companies_quotes VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, ` +
    //                                                 `$22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38) ON CONFLICT (symbol) DO NOTHING;`, Object.keys(quote).map((k) => quote[k]))));
    
    // console.log("Updated Company Quotes");
    // await Promise.all(ceoCompensation.map(ceoCompensation => db.query(`INSERT INTO ceo_compensation VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT (symbol) DO NOTHING;`, Object.keys(about).map((k) => ceoCompensation[k]))));
    // console.log("Updated Ceo compensation");
    // await Promise.all(symbols.map(symbol => db.query('UPDATE target_companies SET parsed = 1 WHERE symbol = $1', [symbol])));
    // console.log("Updated target company");
 
}).then(companies => { 
    Promise.each(companies.slice(0, 1).map(company => {   
        return iex.company(company.symbol).then(companyInfo => {
            companyInfo.tags = JSON.stringify(companyInfo.tags); 
            return db.query(`INSERT INTO companies VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) ON CONFLICT (symbol) DO NOTHING;`, 
            Object.assign(Object.keys(companyInfo).map((k) => companyInfo[k])), {region: company.region, currency: company.currency});
        }).then(result => console.log(company.symbol + " processed.")).catch(e => console.log(e));
    })).then(done => console.log("Symbols processed") && process.exit(0)).catch(e => console.log(e));
    
})