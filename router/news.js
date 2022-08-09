const express = require('express');
const router = express.Router();
const fs = require('fs/promises');

const db = '../nodejs/db.json'

router.get('/', async (req, res) => {
	try {
		const getNews = await fs.readFile(db, 'utf8');
		const toJson = JSON.parse(getNews);

		res.status(200).json({ data: toJson.news });

	} catch (error) {
		res.status(400).json({ data: error });
	}
});

router.post('/', (req, res) => {
	fs.readFile(db, 'utf-8')
		.then(data => {
			const toJson = JSON.parse(data);

			let body = {
				id: toJson.news[toJson.news.length - 1].id + 1,
				title: req.body.title,
				desc: req.body.desc
			};

			toJson.news.push(body);

			fs.writeFile(db, JSON.stringify(toJson))
				.then(successInsert => {
					res.status(200).json({ message: 'Success add news' });
				})
				.catch(err => {
					res.status(400).json({ data: err });
				});
		})
		.catch(err => {
			res.status(400).json({ data: err });
		});
});

module.exports = router;

