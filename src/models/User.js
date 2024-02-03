const Model = require("./model");
const crypto = require('crypto');

class User extends Model {

    constructor() {
        super()
        this.table = 'users'
    }

    async select(fields, whereClause) {
        const result = await super.select(fields, whereClause);
        return result;
    }

    async insert(data) {
        const { password } = data

        const salt = crypto.randomBytes(16).toString('hex'); //salt
        const hash = crypto.createHash('sha256').update(password + salt).digest('hex'); //permanente

        data.password = hash;
        data.salt = salt;

        const result = await super.insert(data);
        return result;
    }

    async delete(whereClause) {
        const result = await super.delete(whereClause);
        return result;
    }

    async update(data, whereClause) {
        const result = await super.update(data, whereClause);
        return result;
    }

}

module.exports = User