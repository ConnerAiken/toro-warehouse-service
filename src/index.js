#!/usr/bin/env node    
import _ from "lodash";
const iex = require('iexcloud_api_wrapper'); 
import Db from './helpers/db.js';
 
(async () => {
    const db = new Db(); 
    let result = await db.query('select * from target_companies where parsed = 0'); 
    const symbols = result.rows.map(row => row.symbol);
  
    let quoteData = await Promise.all(symbols.map(symbol => iex.quote(symbol)));
    let aboutData = await Promise.all(symbols.map(symbol => iex.company(symbol)));
        aboutData = aboutData.map(about => {
            about.tags = JSON.stringify(about.tags);  
            return about;
        });

    await Promise.all(aboutData.map(about => db.query(`INSERT INTO companies VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT (symbol) DO NOTHING;`, Object.keys(about).map((k) => about[k]))));
    await Promise.all(quoteData.map(quote => db.query(`INSERT INTO companies_quotes VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, ` +
                                                        `$22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38) ON CONFLICT (symbol) DO NOTHING;`, Object.keys(quote).map((k) => quote[k]))));
    await Promise.all(symbols.map(symbol => db.query('UPDATE target_companies SET parsed = 1 WHERE symbol = $1', [symbol])));
    
    console.log("All done!");
    process.exit(0);
})().catch(e => console.error(e.stack));