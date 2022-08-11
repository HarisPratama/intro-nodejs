const fs = require('fs/promises');

const getDb = require("../model");
const db = '../nodejs/db.json';

class NewsController {

	static async getNews(req, res) {
		try {
			const getNews = await getDb();

			res.status(200).json({ data: getNews.news });
		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

	static async getDetailNews(req, res) {
		try {
			const {id} = req.params;
			const getNews = await getDb();

			const getDetail = getNews.news.filter(news => {
				if (news.id === +id) {
					return news
				}
			})

			if (getDetail.length > 0) {
				res.status(200).json({ data: getDetail[0] });
			} else {
				res.status(404).json({ message: 'Data not found' });
			}

		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

	static async createNews(req, res) {
		try {
			const getNews = await getDb();

			let body = {
				id: getNews.news ? getNews.news[getNews.news.length - 1].id + 1 : 1,
				title: req.body.title,
				desc: req.body.desc
			};

			if (!getNews.news) {
				getNews.news = [];
			}

			getNews.news.push(body);

			await fs.writeFile(db, JSON.stringify(getNews));

			res.status(200).json({ message: 'Success add news' });
		} catch (error) {
			console.log(error, '<<< error');
			res.status(400).json({ message: JSON.stringify(error) });
		}
	}

	static async updateNews(req, res) {
		try {
			const { id } = req.params;
			const { title, desc } = req.body;

			const getNews = await getDb();

			const getOtherNews = [];

			const findNews = getNews.news.filter(article => {
				if (article.id === +id) {
					return article;
				} else {
					getOtherNews.push(article);
				}
			});

			if (findNews.length > 0) {
				getNews['news'] = getOtherNews;

				await fs.writeFile(db, JSON.stringify(getNews));

				const data = {
					id: findNews[0].id,
					title,
					desc
				};

				getNews.news.push(data);

				await fs.writeFile(db, JSON.stringify(getNews));

				res.status(200).json({ message: `Success update article with id ${ id }` });
			} else {
				res.status(200).json({ message: 'Data not found' });
			}
		} catch (error) {
			res.status(400).json({ data: err });
		}
	}

	static async deleteNews(req, res) {
		try {
			const { id } = req.params;

			const getNews = await getDb();

			let getDetailNews;

			const findNews = getNews.news.filter(news => {
				if (news.id !== +id) {
					return news;
				} else getDetailNews = news;
			});

			if (getDetailNews) {
				getNews['news'] = findNews;
				await fs.writeFile(db, JSON.stringify(getNews));
				res.status(200).json({ message: `Success delete article with id ${ id }` });
			} else {
				res.status(200).json({ message: 'Data not found' });
			}
		} catch (error) {
			console.log(error, '<< error');
			res.status(400).json({ data: error });
		}
	}

}

module.exports = NewsController;
