#!/usr/bin/env node  
import path from "path";
import dotenv from "dotenv";
import axios from "axios";  
 
import utils from "./helpers/utils";  
import Stocks from "./helpers/stocks"; 
 
global.path = path;
global.dotenv = dotenv; 
utils.loadENV();
 
const stockService = new Stocks();
 
stockService.getStock('GET', '/beta/stock/aapl/company');
 

async function getAccount() {
    try {
      const response = await axios.get('/account/metadata');
      return response; 
    } catch (error) { 
      return error;
    }
  }

async function togglePayAsYouGo() {
    try {
    const response = await axios.post('/account/payasyougo');
    return response; 
    } catch (error) { 
    return error;
    }
}