#!/usr/bin/env node    
import Db from './helpers/db.js';
import _ from "lodash"; 
const iex = require('iexcloud_api_wrapper');  
const jsonfile = require('jsonfile'); 
let Promise = require("bluebird"); 
const moment = require('moment');
  

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
	.then(result => db.query(`SELECT symbol FROM companies WHERE symbol NOT IN (select symbol from social_sentiment) ORDER BY random() LIMIT 25;`))
	.then(symbols => {
		console.log(`Fetched ${symbols.rows.length} symbols from the database.`);
		jsonfile.writeFileSync(`${process.cwd()}/output/socialSentiment.txt`, `${moment().format('yyyy-mm-dd:hh:mm:ss')} - Fetched ${symbols.rows.length} symbols from the database.`, { flag: 'a' });
		jsonfile.writeFileSync(`${process.cwd()}/output/socialSentiment.txt`, `${moment().format('yyyy-mm-dd:hh:mm:ss')} - Pulling info for ${symbols.rows.map(company => company.symbol).join(',')} symbols.`, { flag: 'a' });
		return Promise.all(symbols.rows.map(symbol => {  
			let returnObj = {symbol: symbol.symbol};
			return iex.socialSentiment(symbol.symbol, 'daily', today.yyyymmdd())
					  .then(sentiment => {
						  returnObj.sentiment = sentiment.sentiment;
						  returnObj.totalScores = sentiment.totalScores;
						  returnObj.positive = sentiment.positive;
						  returnObj.negative = sentiment.negative; 
						  return returnObj;
					  }); 
		})).then(e => Promise.resolve(e)).catch(e => Promise.resolve(e));
	})   
	.then(companyInfos => { 
		console.log(`Pulled all company social sentiments, starting update process.`);  
		companyInfos.forEach((company, index) => {   
			let data = [company.symbol, company.sentiment, company.totalScores, company.positive, company.negative];
			companyData.push(data); 
			companyPromises.push(db.query(`INSERT INTO social_sentiment (symbol, date, sentiment, totalscores, positive, negative, last_updated) VALUES ($1, NOW()::date, $2, $3, $4, $5, NOW())`, data)); 
		}); 

		return Promise.all(companyPromises); 
	}).then(promises => { 
		console.log("All done!");
		process.exit(0);
	}).catch(err => {
		console.log(err);
		process.exit(1);
	})