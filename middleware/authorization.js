const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

const db = '../nodejs/db.json';

const authorization = async (req, res, next) => {
	const getDb = await fs.readFile(db, 'utf8');
	const toJson = JSON.parse(getDb);

	if (req.headers.authorization) {
		console.log(req.headers.authorization.split(' '), '<< req.headers.authorization')
	
		const getToken = req.headers.authorization.split(' ')[1];
	
		const decode = jwt.verify(getToken, 'secret')
		console.log(toJson['users'], '<< toJson[users]');

		const getUser = toJson['users'].filter(user => {
			if (decode.email === user.email) {
				return user;
			}
		})

		if (getUser.length > 0) {
			req.userHasLogin = decode;
			next()
		} else {
			req.error = 'User not found'
			next();
		}

	} else {
		req.error = 'unauthorized'
		next()
	}
}

module.exports = authorization
