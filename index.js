const express = require('express')
const fs = require('fs/promises');
const db = './db.json'

const app = express()

app.use(express.json())
app.use(express.urlencoded())


app.get('/articles', async (req, res) => {
	try {
		const getArticles = await fs.readFile(db, 'utf8')
		const toJson = JSON.parse(getArticles)

		res.status(200).json({ data: toJson.articles })

	} catch (error) {
		res.status(400).json({data: error})	
	}
})

app.get('/article/:id', async (req, res) => {
	const getArticles = await fs.readFile(db, 'utf8');
	const toJson = JSON.parse(getArticles)

	const articles = toJson.articles;
	const id = req.params.id

	const getArticle = articles.filter((article, i) => {
		if (article.id === +id) {
			return article
		}
	})

	res.status(200).json({ data: getArticle[0] })
})

app.get('/news', async (req, res) => {
	try {
		const getNews = await fs.readFile(db, 'utf8');
		const toJson = JSON.parse(getNews);

		res.status(200).json({ data: toJson.news });

	} catch (error) {
		res.status(400).json({ data: error });
	}
})

app.post('/articles', async (req, res) => {
	try {
		const getNews = await fs.readFile(db, 'utf8');
		const toJson = JSON.parse(getNews);

		let data = req.body;

		data['id'] = toJson.articles[toJson.articles.length - 1].id + 1;

		toJson.articles.push(data);

		await fs.writeFile(db, JSON.stringify(toJson));

		res.status(200).json({ message: 'Success add article' });
	} catch (error) {
		res.status(400).json({ data: error });
	}
})




app.get('/', (req, res) => {
	res.send('Membuat API')
})

app.listen(3000, () => {
	console.log('App listen to port 3000')
});
