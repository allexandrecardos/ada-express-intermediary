const User = require("../models/User");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class AuthController {

    async login(req, res) {
        const { email, password } = req.body;

        const user = new User();
        user.connect()
        const result = await user.select("*", `email = '${email}' `);
        user.disconnect()

        if (!result.rowCount) {
            res.json({ message: "Email ou Senha invalidos" });
            return;
        }

        const hashPassword = crypto.createHash('sha256').update(password + result.rows[0].salt).digest('hex');
        const userPassword = result.rows[0].password;

        if (userPassword !== hashPassword) {
            res.json({ message: "Email ou Senha invalidos" });
            return;
        }


        const accessToken =
            jwt.sign(
                { id: result.rows[0].id },
                process.env.PRIVATE_KEY,
                { expiresIn: process.env.EXPIRES_IN }
            );
        
        res
            .cookie("access_token", accessToken, { httpOnly: true, secure: false })
            .cookie("user_id", result.rows[0].id, { httpOnly: true, secure: false })
            .status(200)
            .json({ message: "Usuário conectado com Sucesso" });
    }

    async logout(req, res) {
        if(!req.cookies.access_token){
            res
            .status(200)
            .json({ message: "Usuário ja está desconectado" });
        }

        res
        .clearCookie("access_token")
        .clearCookie("user_id")
        .status(200)
        .json({ message: "Usuário desconectado com Sucesso" });
    }

    async register(req, res) {
        const data = req.body;
        try {
            const user = new User();
            await user.connect();
            const result = await user.insert(data)
            await user.disconnect();
            result.rowCount > 0 ?
                res.status(200).json({
                    message: 'Usuário cadastrado com sucesso',
                    user: result.rows[0],
                }) :
                res.status(422).json({ message: 'Não foi possivél cadastrar o usuário' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

}

module.exports = AuthController