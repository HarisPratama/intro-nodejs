const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')
const { createServer } = require("http");

const fs = require('fs/promises');

const router = require('./router');
const ViewController = require('./controllers/ejs');

const port = 3001

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get('/', (req, res) => {
	res.send('Membuat API');
});

app.get('/view', ViewController.home);

const httpServer = createServer(app)

const server = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000'
	}
})

server.on("connection", async (socket) => {
	const getNews = await fs.readFile('./db.json', 'utf-8');

	const toJson = JSON.parse(getNews);

	socket.emit('news', { data: toJson.news });

})

httpServer.listen(port, () => {
	console.log(`App listen to port ${port}`)
});


