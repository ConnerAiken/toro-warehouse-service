import path from "path";
import fs from "fs";
const { Client } = require('pg');

export default class Db {
    constructor() {
        this.client = new Client({ssl: true});   
        return this;
    }

    async query(sql = 'SELECT \'1\'', params = []) {  
        try {   
            const results = await this.client.query(sql, params);
            return results;
        } catch(e) {
            console.log("Could not connect to database!");
            console.log(e);
        }
    }
}