const express = require('express');
const router = express.Router();
const fs = require('fs/promises');

const bcrypt = require('bcrypt');
const { getToken } = require('../helpers/jwt');

const db = '../nodejs/db.json';

router.post('/register', async (req, res) => {
	try {
		const getUser = await fs.readFile(db, 'utf-8');
		const toJson = JSON.parse(getUser);

		const saltRounds = 10;

		const salt = bcrypt.genSaltSync(saltRounds);

		const { name, email, password } = req.body;

		const body = {
			name,
			email,
			password: bcrypt.hashSync(password, salt),
		};

		if (!toJson['users']) {
			toJson['users'] = [];
		}

		toJson['users'].push(body);

		await fs.writeFile(db, JSON.stringify(toJson), 'utf-8');

		res.status(200).json({ message: 'Success register' });
	} catch (error) {
		res.status(400).json({ message: JSON.stringify(error) });
	}
});

router.post('/login', async (req, res) => {
	try {
		const getDB = await fs.readFile(db, 'utf-8');
		const toJson = JSON.parse(getDB);

		const { email, password } = req.body;

		let getUser;

		for (let i = 0; i < toJson['users'].length; i++) {
			if (email === toJson['users'][i].email) {
				getUser = toJson['users'][i];
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
});

module.exports = router
