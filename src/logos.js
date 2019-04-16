#!/usr/bin/env node    
import Db from './helpers/db.js';
import _ from "lodash"; 
const iex = require('iexcloud_api_wrapper');  
const jsonfile = require('jsonfile'); 
let Promise = require("bluebird"); 
const moment = require('moment');
const axios = require('axios');
  
function getBase64(url) {
	return axios
	  .get(url, {
		responseType: 'arraybuffer'
	  })
	  .then(response => new Buffer(response.data, 'binary').toString('base64'))
  }

Date.prototype.yyyymmdd = function() {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();
  
	return [this.getFullYear(),
			(mm>9 ? '' : '0') + mm,
			(dd>9 ? '' : '0') + dd
		   ].join('');
  };

let today = new Date();
let companyPromises = []; 
let companyData = [];
const db = new Db();
global.db = db;

db.client.connect() 
	.then(result => db.query(`SELECT symbol FROM companies WHERE symbol NOT IN (select symbol from logos) ORDER BY random() LIMIT 25;`))
	.then(symbols => {
		console.log(`Fetched ${symbols.rows.length} symbols from the database.`);
		jsonfile.writeFileSync(`${process.cwd()}/output/logos.txt`, `${moment().format('yyyy-mm-dd:hh:mm:ss')} - Fetched ${symbols.rows.length} symbols from the database.`, { flag: 'a' });
		jsonfile.writeFileSync(`${process.cwd()}/output/logos.txt`, `${moment().format('yyyy-mm-dd:hh:mm:ss')} - Pulling info for ${symbols.rows.map(company => company.symbol).join(',')} symbols.`, { flag: 'a' });
		return Promise.all(symbols.rows.map(symbol => {  
			let returnObj = {symbol: symbol.symbol};
			return iex.logoURL(symbol.symbol).then(logo => {
				returnObj.logo = logo.url;
				return getBase64(logo.url);
			}).then(base64 => {
				returnObj.base64 = base64; 
				return returnObj;
			}); 
		}));
	})   
	.then(logos => { 
		console.log(`Pulled all company logos, starting update process.`);  

		logos.forEach((company, index) => {  
			let data = [company.symbol, company.logo, company.base64];
			companyData.push(data);  
			companyPromises.push(db.query(`INSERT INTO logos (symbol, url, base64) VALUES($1, $2, $3)`, data)); 
		}); 

		return Promise.all(companyPromises); 
	}).then(promises => { 
		console.log("All done!");
		process.exit(0);
	}).catch(err => {
		console.log(err);
		process.exit(1);
	})