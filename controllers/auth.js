const fs = require('fs/promises');
const getDb = require("../model");
const bcrypt = require('bcrypt');

const {getToken} = require('../helpers/jwt')
const db = '../nodejs/db.json'

class AuthController {

	static async register(req, res) {
		try {
			const getUser = await getDb();

			const saltRounds = 10;

			const salt = bcrypt.genSaltSync(saltRounds);

			const { name, email, password } = req.body;

			const body = {
				id: 
				getUser.users[getUser.users.length - 1].id 
				? 
					getUser.users[getUser.users.length -1].id + 1 
				: 
					1,
				name,
				email,
				password: bcrypt.hashSync(password, salt),
			};

			if (!getUser['users']) {
				getUser['users'] = [];
			}

			getUser['users'].push(body);

			await fs.writeFile(db, JSON.stringify(getUser), 'utf-8');

			res.status(200).json({ message: 'Success register' });
		} catch (error) {
			console.log(error, '<<< error');
			res.status(400).json({ message: JSON.stringify(error) });
		}
	}

	static async login(req, res) {
		try {
			const getUsers = await getDb();

			const { email, password } = req.body;

			let getUser;

			for (let i = 0; i < getUsers['users'].length; i++) {
				if (email === getUsers['users'][i].email) {
					getUser = getUsers['users'][i];
				}
			}

			if (getUser) {
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
}

module.exports = AuthController;
