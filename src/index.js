#!/usr/bin/env node    
const iex = require('iexcloud_api_wrapper'); 
import Db from "./helpers/db.js";
 
const db = new Db(); 
const quote = async (sym) => {
    const quoteData = await iex.quote(sym); 
    console.log(quoteData);
    const result = await db.query('INSERT INTO COMPANIES ', quoteData);
    console.log("Quote was inserted " + $result);
    console.log(result);
};

quote("WDC");
       