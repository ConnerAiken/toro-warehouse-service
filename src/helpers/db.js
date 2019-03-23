const { Client } = require('pg');

export default class Db {
    constructor() {
        this.client = new Client();  
    }
    async query(sql = 'SELECT \'1\'', params = []) { 
        try {
            await this.client.connect();
            return await this.client.query($sql, $params);
        } catch(e) {
            console.log(e);
        }
    }
}