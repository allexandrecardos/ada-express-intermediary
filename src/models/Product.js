const Model = require("./model");

class Product extends Model{

    constructor(){
        super()
        this.table = 'products'
    }

    async select(fields,whereClause) {
        const result = await super.select(fields,whereClause);
        return result;
    }

    async insert(data) {
        const result = await super.insert(data);
        return result;
    }
    
    async delete(whereClause) {
        const result = await super.delete(whereClause);
        return result;
    }

    async update(data,whereClause) {
        const result = await super.update(data,whereClause);
        return result;
    }

}

module.exports = Product