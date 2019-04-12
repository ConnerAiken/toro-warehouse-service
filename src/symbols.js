#!/usr/bin/env node    
import Db from './helpers/db.js';
import _ from "lodash";
const iex = require('iexcloud_api_wrapper'); 
const jsonfile = require('jsonfile'); 
let Promise = require("bluebird"); 
 
let companyData = []; 
const db = new Db();
global.db = db;

// todo
// - Cleanup promise handling
// - Select previously stored and filter out inserts
db.client.connect()
	.then(result => iex.marketSymbols())
	.then(companies => {
		// Copy symbols into array then archive them
		companyData = [...companies];
		jsonfile.writeFileSync(`${process.cwd()}/output/symbols.json`, companyData);
		console.log(` Archived the symbols to: ${process.cwd()}/output/symbols.json, now starting upsert promise chain.`);

		// Filter applicable companies so api calls dont randomly fail
		const applicableCompanies = companies.filter(company => company.isEnabled);

		// Return a promise of all promises for process completion 
		return Promise.all(applicableCompanies.map(company => {
			const data = [company.symbol, company.name, company.type, company.exchange, company.region, company.currency];
			return db.query(`INSERT INTO companies (symbol, name, issuetype, exchange, region, currency) 
							 VALUES ($1, $2, $3, $4, $5, $6) 
							 ON CONFLICT (symbol) DO NOTHING;`, 
							data).then(result => Promise.resolve(console.log("Upserted " + company.symbol))); 
		}));
	})
	.then(companyPromises => { 
		console.log("All done!");
		process.exit(0);
	}); 