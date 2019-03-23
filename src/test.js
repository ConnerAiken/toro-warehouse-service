#!/usr/bin/env node 
import path from "path";
import dotenv from "dotenv";
import utils from "./helpers/utils.js"; 
import Auth from "./classes/auth.js";

global.path = path;
global.dotenv = dotenv;

utils.loadENV();

const auth = new Auth(); 
const stock = new Stocks();

stock.getStock(options);
 

 