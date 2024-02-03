const Product = require("../models/Product");
const fs = require('fs').promises;

class ProductController {

    async createProduct(req, res) {
        const data = req.body;
        data.photo_path = req.file.path
        data.user_id = req.cookies.user_id
        try {
            const product = new Product();
            await product.connect()
            const result = await product.insert(data)
            await product.disconnect();
            result.rowCount > 0 ?
                res.json({
                    message: 'Produto cadastrado com sucesso',
                    product: result.rows[0],
                }) :
                res.status(422).json({ message: 'Não foi possivél cadastrar o produto' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async getAllProducts(req, res) {
        try {
            const product = new Product();
            await product.connect()
            const products = await product.select();
            await product.disconnect();
            products.rowCount > 0 ?
                res.json(products.rows) :
                res.status(400).json({ message: 'Nenhum produto encontrado' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async getProductById(req, res) {
        const { id } = req.params
        try {
            const product = new Product();
            await product.connect()
            const products = await product.select("*",` id = ${id}`);
            await product.disconnect();
            products.rowCount > 0 ?
                res.json(products.rows) :
                res.status(400).json({ message: 'Nenhum produto encontrado' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async getProductByQuery(req, res) {
        const { category, id } = req.params
        const product = new Product();
        await product.connect()
        let products = undefined;

        try {
            if (category && !id) {
                products = await product.select('*', `category = '${category}'`);
            }

            if (category && id) {
                products = await product.select('*', `category = '${category}' AND user_id = ${id}`);
            }
            await product.disconnect();
            products.rowCount > 0 ?
                res.json(products.rows) :
                res.status(400).json({ message: 'Nenhum produto encontrado' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async updateProduct(req, res) {
        const data = req.body;
        const { id } = req.params;
        try {
            const product = new Product();
            await product.connect()
            console.log(req.body);
            const result = await product.update(data, `id = ${id}`);
            await product.disconnect();
            res.status(200).json({ message: 'Produto alterado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const product = new Product();
    
            await product.connect();

            const result = await product.select("photo_path, user_id", `id = ${id}`);

            if(req.cookies.user_id !== result.rows[0].user_id){
                res.status(403).json({ message: 'Você não tem permissão para excluir esse produto' });
            }

            const photoPath = result.rows[0].photo_path;
    
            await fs.unlink(photoPath);
    
            const deleteResult = await product.delete(`id = ${id}`);
    
            await product.disconnect();
    
            res.status(200).json({ message: 'Produto deletado com sucesso' });
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ message: 'Erro ao deletar o produto' });
        }
    }

}

module.exports = ProductController