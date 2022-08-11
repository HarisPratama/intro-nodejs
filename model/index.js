const fs = require('fs/promises');

const db = '../nodejs/db.json';

const getDb = async () => {
	const getDb = await fs.readFile(db, 'utf8');
	const toJson = JSON.parse(getDb);

	return toJson;
}

module.exports = getDb
