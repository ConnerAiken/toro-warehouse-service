#!/usr/bin/env node    
const iex = require('iexcloud_api_wrapper'); 
import Db from "./helpers/db.js";
 
const db = new Db(); 
const symbols =  ['WDC']; // await db.query('SELECT * FROM TARGET_COMPANIES ', quoteData); 

symbols.forEach(async function(symbol) {
    const quoteData = await iex.quote(symbol);  
    const aboutData = await iex.company(symbol);
    const result = await db.query('INSERT INTO COMPANIES ', quoteData);
    console.log(aboutData); 
}); 