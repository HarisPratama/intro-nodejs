let ejs = require('ejs');
const getDb = require('../model');
let people = ['geddy', 'neil', 'alex'];

class ViewController {
	static async home(req, res) {
		const getArticle = await getDb()

		let html = ejs.render(
			'<%= getArticle; %>', { getArticle: getArticle.articles }
		);

		res.send(html)
	}
}

module.exports = ViewController
