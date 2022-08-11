const fs = require('fs/promises');

const getDb = require("../model");
const db = '../nodejs/db.json';

class ArticleController {

	static async getArticles(req, res) {
		try {
			const getArticles = await getDb();

			res.status(200).json({ data: getArticles.articles });
		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

	static async getArticle(req, res) {
		try {
			const getArticles = await getDb();

			const articles = getArticles.articles;
			const id = req.params.id;

			const getArticle = articles.filter((article, i) => {
				if (article.id === +id) {
					return article;
				}
			});

			res.status(200).json({ data: getArticle[0] });
		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

	static async createArticle(req, res) {
		try {
			const getArticles = await getDb();
		
			const { title, desc } = req.body;

			let data = {
				id: getArticles.articles ? getArticles.articles[getArticles.articles.length - 1].id + 1 : 1,
				title: title,
				desc: desc
			};

			if (!getArticles.articles) {
				getArticles.articles = [];
			}

			getArticles.articles.push(data);

			await fs.writeFile(db, JSON.stringify(getArticles));

			res.status(200).json({ message: 'Success add article' });
		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

	static async updateArticle(req, res) {
		try {
			const { id } = req.params;
			const { title, desc } = req.body;

			const getArticles = await getDb();

			const getOtherArticles = [];

			const findArticle = getArticles.articles.filter(article => {
				if (article.id === +id) {
					return article;
				} else {
					getOtherArticles.push(article);
				}
			});

			if (findArticle.length > 0) {
				getArticles['articles'] = getOtherArticles;

				await fs.writeFile(db, JSON.stringify(getArticles));

				const data = {
					id: findArticle[0].id,
					title,
					desc
				};

				getArticles.articles.push(data);

				await fs.writeFile(db, JSON.stringify(getArticles));

				res.status(200).json({ message: `Success update article with id ${ id }` });
			} else {
				res.status(200).json({ message: 'Data not found' });
			}
		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

	static async deleteArticle(req, res) {
		try {
			const { id } = req.params;

			const getArticles = await getDb();

			let getArticle;

			const findArticle = getArticles.articles.filter(article => {
				if (article.id !== +id) {
					return article;
				} else getArticle = article;
			});

			if (getArticle) {
				getArticles['articles'] = findArticle;
				await fs.writeFile(db, JSON.stringify(getArticles));
				res.status(200).json({ message: `Success delete article with id ${ id }` });
			} else {
				res.status(200).json({ message: 'Data not found' });
			}
		} catch (error) {
			res.status(400).json({ data: err });
		}
	}

}

module.exports = ArticleController;
