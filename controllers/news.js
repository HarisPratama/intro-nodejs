const { News } = require('../models')

class NewsController {

	static async getNews(req, res) {
		try {
			const getNews = await News.findAll();

			res.status(200).json({ data: getNews });
		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

	static async getDetailNews(req, res) {
		try {
			const {id} = req.params;
			const getNews = await News.findByPk(id);

			if (getNews) {
				res.status(200).json({ data: getNews });
			} else {
				res.status(404).json({ message: 'Data not found' });
			}

		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

	static async createNews(req, res) {
		try {
			const body = {
				title: req.body.title,
				desc: req.body.desc,
				image: req.body.image
			};

			await News.create(body);

			res.status(200).json({ message: 'Success add news' });
		} catch (error) {
			console.log(error, '<<< error');
			res.status(400).json({ message: JSON.stringify(error) });
		}
	}

	static async updateNews(req, res) {
		try {
			const { id } = req.params;
			const { title, desc, image } = req.body;

			const data = {
				title,
				desc,
				image
			}

			const getNews = await News.findByPk(id);

			if (getNews) {
				await News.update(data, {
					where: {id: id}
				})

				res.status(200).json({ message: `Success update article with id ${ id }` });
			} else {
				res.status(200).json({ message: `Data with id ${ id } does not exist` });
			}

		} catch (error) {
			res.status(400).json({ data: err });
		}
	}

	static async deleteNews(req, res) {
		try {
			const { id } = req.params;

			const getDetailNews = await News.findByPk(id);

			if (getDetailNews) {
				await News.destroy({
					where: {
						id
					}
				})
				res.status(200).json({ message: `Success delete article with id ${ id }` });
			} else {
				res.status(200).json({ message: 'Data not found' });
			}
		} catch (error) {
			res.status(400).json({ data: error });
		}
	}

}

module.exports = NewsController;
