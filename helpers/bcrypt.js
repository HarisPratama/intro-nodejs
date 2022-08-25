const bcrypt = require('bcrypt');

function hashPassword(userPassword) {
	const salt = bcrypt.genSaltSync(+process.env.SALT);
	const hash = bcrypt.hashSync(userPassword, salt);
	return hash;
}

function comparePassword(userPassword, hash) {
	return bcrypt.compareSync(userPassword, hash);
}


module.exports = { hashPassword, comparePassword };
