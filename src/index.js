#!/usr/bin/env node    
const iex = require('iexcloud_api_wrapper'); 
import Db from "./helpers/db.js";
 
const db = new Db(); 
const quote = async (sym) => {
    const quoteData = await iex.quote(sym); 
    console.log(quoteData)
};

quote("WDC");
       