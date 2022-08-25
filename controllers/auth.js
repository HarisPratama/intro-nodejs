const fs = require('fs/promises');
const bcrypt = require('bcrypt');

const { User, Post } = require('../models/index')
const getDb = require("../model");
const {getToken} = require('../helpers/jwt')
const db = '../nodejs/db.json'

class AuthController {

	static async register(req, res) {
		try {

			const { name, email, password } = req.body;

			const body = {
				name,
				email,
				password,
			};

			await User.create(body);
			res.status(200).json({ message: 'Success register' });
		} catch (error) {
			res.status(400).json({ message: JSON.stringify(error) });
		}
	}

	static async login(req, res) {
		try {
			const { email, password } = req.body;

			let getUser = await User.findOne({
				where: {
					email
				}
			});

			if (getUser != null) {
				const comparePassword = await bcrypt.compare(password, getUser.password);

				if (comparePassword) {
					const data = {
						name: getUser.name,
						email: getUser.email,
					};

					const getTokenFromJwt = getToken(data);

					res.status(200).json({ data: getTokenFromJwt });
				} else {
					res.status(200).json({ message: 'Wrong Password' });
				}
			} else {
				res.status(200).json({ message: 'User not register yet' });
			}

		} catch (error) {
			res.status(400).json({ message: JSON.stringify(error) });
		}
	}

	static async getuser(req, res) {
		try {

			let getUser = await User.findByPk(req.params.id, {
				include: Post
			});

			if (getUser != null) {

				res.status(200).json({ data: getUser });
			} else {
				res.status(200).json({ message: 'User not register yet' });
			}

		} catch (error) {
			res.status(400).json({ message: JSON.stringify(error) });
		}
	}
}

module.exports = AuthController;
