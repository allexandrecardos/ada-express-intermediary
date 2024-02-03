const Connection = require('../database/Connection');

class Model {
    constructor() {
        this.connection = new Connection();
    }

    async connect() {
        await this.connection.connect();
    }

    async disconnect() {
        await this.connection.disconnect();
    }

    async select(fields = '*', whereClause = '') {
        try {
            // await this.connect();

            let query;
            let values;

            if (fields === '*') {
                query = `SELECT * FROM ${this.table}`;
            } else {
                const fieldList = Array.isArray(fields) ? fields.join(', ') : fields;
                query = `SELECT ${fieldList} FROM ${this.table}`;
            }

            if (whereClause) {
                query += ` WHERE ${whereClause}`;
            }

            const result = await this.connection.client.query(query, values);
            return result;

        } catch (err) {
            console.error('ERRO', err);
        } 
    }

    async insert(data) {
        try {
            // await this.connect();

            const columns = Object.keys(data).join(', ');
            const values = Object.values(data);
            const placeholders = values.map((value, index) => `$${index + 1}`).join(', ');

            const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`;
            
            const result = await this.connection.client.query(query, values);
            return result;

        } catch (err) {
            console.error('ERRO:', err);
        } 
    }

    async delete(whereClause = '') {
        try {
            // await this.connect();

            let query;
            if (whereClause) {
                query = `DELETE FROM ${this.table} WHERE ${whereClause}`;
            } else {
                console.error('Erro: Deve fornecer uma cláusula WHERE para a função delete.');
                return;
            }

            const result = await this.connection.client.query(query);
            return result

        } catch (err) {
            console.error('ERRO', err);
        } 
    }

    async update(data, whereClause = '') {
        try {
            // await this.connect();

            const columns = Object.keys(data);
            const values = Object.values(data);
            const placeholders = values.map((value, index) => `${columns[index]} = $${index + 1}`).join(', ');

            let query;

            if (whereClause) {
                query = `UPDATE ${this.table} SET ${placeholders} WHERE ${whereClause}`;
            } else {
                console.error('Erro: Deve fornecer uma cláusula WHERE para a função update.');
                return;
            }

            const result = await this.connection.client.query(query, values);
            return result

        } catch (err) {
            console.error('ERRO', err);
        } 
    }
}

module.exports = Model;