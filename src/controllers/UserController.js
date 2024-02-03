const User = require("../models/User");

class UserController {

    async getAllUsers(req, res) {
        try {
            const user = new User();
            await user.connect()
            const users = await user.select();
            await user.disconnect()
            users.rowCount > 0 ?
                res.json(users.rows) :
                res.status(400).json({ message: 'Nenhum usuário encontrado' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = new User();
            await user.connect()
            const users = await user.select('*', `id = ${id}`);
            await user.disconnect()
            users.rowCount > 0 ?
                res.json(users.rows) :
                res.status(400).json({ message: 'Nenhum usuário encontrado' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async updateUser(req, res) {
        const data = req.body;
        const { id } = req.params;
        try {
            const user = new User();
            await user.connect()
            const result = await user.update(data, `id = ${id}`);
            await user.disconnect()
            res.status(200).json({ message: 'Usuário alterado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = new User();
            await user.connect()
            const users = await user.delete(`id = ${id}`);
            await user.disconnect()
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

}

module.exports = UserController