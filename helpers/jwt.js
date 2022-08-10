const jwt = require('jsonwebtoken');
const privateKey = 'secret';

const getToken = (data) => {
	const token = jwt.sign(data, privateKey)

	return token;
}

module.exports = {
	getToken
}
