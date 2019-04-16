#!/usr/bin/env node    
import Db from './helpers/db.js';
import _ from "lodash"; 
const iex = require('iexcloud_api_wrapper');  
const jsonfile = require('jsonfile'); 
let Promise = require("bluebird"); 
const moment = require('moment');
  
let companyPromises = []; 
let companyData = [];
const db = new Db();
global.db = db;

db.client.connect() 
	.then(result => db.query(`SELECT symbol FROM companies WHERE industry IS NULL ORDER BY random() LIMIT 25;`))
	.then(symbols => {
		console.log(`Fetched ${symbols.rows.length} symbols from the database.`);
		jsonfile.writeFileSync(`${process.cwd()}/output/companyInfo.txt`, `${moment().format('yyyy-mm-dd:hh:mm:ss')} - Fetched ${symbols.rows.length} symbols from the database.`, { flag: 'a' });
		jsonfile.writeFileSync(`${process.cwd()}/output/companyInfo.txt`, `${moment().format('yyyy-mm-dd:hh:mm:ss')} - Pulling info for ${symbols.rows.map(company => company.symbol).join(',')} symbols.`, { flag: 'a' });
		return Promise.all(symbols.rows.map(symbol => {  
			return iex.company(symbol.symbol);
		})).then(e => Promise.resolve(e)).catch(e => Promise.resolve(e));
	})   
	.then(companyInfos => { 
		console.log(`Pulled all company info, starting update process.`); 
		console.log(companyInfos);
		companyInfos.forEach((company, index) => {
			// Getting 429 server error, too many requests
			let data = [company.industry, company.website, company.description, company.sector, company.securityname, JSON.stringify(company.tags), company.employees, company.ceo, company.symbol];
			companyData.push(data); 
			companyPromises.push(db.query(`UPDATE companies SET industry=$1, website=$2, description=$3, sector=$4, securityname=$5, tags=$6, employees=$7, ceo=$8 WHERE symbol=$9`, data)); 
		}); 

		return Promise.all(companyPromises); 
	}).then(promises => { 
		console.log("All done!");
		process.exit(0);
	}).catch(err => {
		console.log(err);
		process.exit(1);
	})