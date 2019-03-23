const { Client } = require('pg');

export default class Db {
    constructor() {
        this.client = new Client();  
        await client.connect();
    }
    query(sql = 'SELECT \'1\'', params = []) { 
        return await this.client.query($sql, $params); 
    }
}