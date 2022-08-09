const express = require('express');
const router = express.Router();
const fs = require('fs/promises');

const db = '../nodejs/db.json'

router.get('/', async (req, res) => {
	try {
		const getArticles = await fs.readFile(db, 'utf8');
		const toJson = JSON.parse(getArticles);

		res.status(200).json({ data: toJson.articles });

	} catch (error) {
		console.log(error, '<< error');
		res.status(400).json({ data: error });
	}
});

router.get('/:id', async (req, res) => {
	const getArticles = await fs.readFile(db, 'utf8');
	const toJson = JSON.parse(getArticles);

	const articles = toJson.articles;
	const id = req.params.id;

	const getArticle = articles.filter((article, i) => {
		if (article.id === +id) {
			return article;
		}
	});


	res.status(200).json({ data: getArticle[0] });
});

router.post('/', async (req, res) => {
	try {
		const getNews = await fs.readFile(db, 'utf8');
		const toJson = JSON.parse(getNews);

		const { title, desc } = req.body;

		let data = {
			id: toJson.articles[toJson.articles.length - 1].id + 1,
			title: title,
			desc: desc
		};

		toJson.articles.push(data);

		await fs.writeFile(db, JSON.stringify(toJson));

		res.status(200).json({ message: 'Success add article' });
	} catch (error) {
		res.status(400).json({ data: error });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { title, desc } = req.body;

		const getNews = await fs.readFile(db, 'utf8');
		const toJson = JSON.parse(getNews);
		const getArticles = [];

		const findArticle = toJson.articles.filter(article => {
			if (article.id === +id) {
				return article;
			} else {
				getArticles.push(article);
			}
		});

		if (findArticle.length > 0) {
			toJson['articles'] = getArticles;

			await fs.writeFile(db, JSON.stringify(toJson));

			const data = {
				id: findArticle[0].id,
				title,
				desc
			};

			toJson.articles.push(data);

			await fs.writeFile(db, JSON.stringify(toJson));

			res.status(200).json({ message: `Success update article with id ${ id }` });
		} else {
			res.status(200).json({ message: 'Data not found' });
		}
	} catch (error) {
		res.status(400).json({ data: err });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { title, desc } = req.body;

		const getNews = await fs.readFile(db, 'utf8');
		const toJson = JSON.parse(getNews);
		const getArticles = [];

		const findArticle = toJson.articles.filter(article => {
			if (article.id === +id) {
				return article;
			} else {
				getArticles.push(article);
			}
		});

		if (findArticle.length > 0) {
			toJson['articles'] = getArticles;

			await fs.writeFile(db, JSON.stringify(toJson));

			let data = {
				id: findArticle[0].id,
			};

			if (title) data['title'] = title;
			if (desc) data['desc'] = desc;

			toJson.articles.push(data);

			await fs.writeFile(db, JSON.stringify(toJson));

			res.status(200).json({ message: `Success update article with id ${ id }` });
		} else {
			res.status(200).json({ message: 'Data not found' });
		}
	} catch (error) {
		res.status(400).json({ data: err });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const getNews = await fs.readFile(db, 'utf8');
		const toJson = JSON.parse(getNews);

		let getArticle;

		const findArticle = toJson.articles.filter(article => {
			if (article.id !== +id) {
				return article;
			} else getArticle = article;
		});

		if (getArticle) {
			toJson['articles'] = findArticle;
			await fs.writeFile(db, JSON.stringify(toJson));
			res.status(200).json({ message: `Success delete article with id ${ id }` });
		} else {
			res.status(200).json({ message: 'Data not found' });
		}
	} catch (error) {
		res.status(400).json({ data: err });
	}
});

module.exports = router
