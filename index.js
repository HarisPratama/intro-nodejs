const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')
const { createServer } = require("http");
const fs = require('fs/promises');
const mysql = require('mysql');

// const connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: '',
// 	database: 'nodejs'
// })

// connection.connect((err) => {
// 	if(err) throw err;
// 	console.log('Database connected');

// 	const query = {
// 		createTable: (tableName, fields) => `CREATE TABLE ${tableName} ${fields}`,
// 		dropTable: 'DROP TABLE users',
// 		insertData: "INSERT INTO users (name, email, password) VALUES ('Haris', 'haris@mail.com', '123456') ",
// 		insertMany: (tableName, fields) => `INSERT INTO ${tableName} ${fields} VALUES ?`,
// 		selectData: "SELECT name, email FROM users",
// 		selectDataByWhere: "SELECT name, email FROM users WHERE name = 'Haris'",
// 		selectDataByWhereLike: "SELECT name, email FROM users WHERE name LIKE 'b%' ",
// 		selectDataByOrder: "SELECT * FROM users ORDER BY id DESC",
// 		deleteData: "DELETE FROM users WHERE name LIKE 'b%'",
// 		updateData: (tableName, data, where) => `UPDATE ${tableName} SET ${data} WHERE ${where} `,
// 		selectDataWithLimit: "SELECT name, email FROM users LIMIT 3 OFFSET 1",
// 		addColumn: (tableName, column) => `ALTER TABLE ${tableName} ADD ${column}`,
// 		join: "SELECT users.name AS user, products.name as product FROM users JOIN products ON users.product_id = products.id",
// 		leftJoin: "SELECT users.name AS user, products.name as product FROM users LEFT JOIN products ON users.product_id = products.id",
// 	}

// 	const dataUsers = [
// 		['John', 'john@mail.com', '123456'],
// 		['Budi', 'budi@mail.com', '123456'],
// 		['a', 'a@mail.com', '123456'],
// 		['b', 'b@mail.com', '123456'],
// 		['c', 'c@mail.com', '123456'],
// 	]

// 	const dataProducts = [
// 		['Sabun', 1000],
// 		['Baju', 1200],
// 	]

// 	connection.query(query.leftJoin, 
// 		(errDrop, results, fields) => {
// 		if (errDrop) throw errDrop;
// 		console.log('QUERY SUCCESS RUNNING');
// 		console.log(results);

// 		// for (let i = 0; i < results.length; i++) {
// 		// 	console.log(results[i], '<<< ', i);
// 		// }
// 	})

// })

const router = require('./router');

require('dotenv').config();

const port = 3001

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get('/', (req, res) => {
	res.send('Membuat API');
});


const httpServer = createServer(app)

const server = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000'
	}
})

server.on("connection", async (socket) => {
	const getNews = await fs.readFile('./db.json', 'utf-8');
	const getChat = await fs.readFile('./chat.json', 'utf-8');

	const toJson = JSON.parse(getNews);
	const chatToJson = JSON.parse(getChat);

	socket.emit('news', { data: toJson.news });

	socket.emit('chat', { data: chatToJson });

	socket.on('message', async (...data) => {
		console.log(data[0].data, '<<< data');
		const getData = data[0].data;

		if (chatToJson[getData.sender]) {
			chatToJson[getData.sender].push({
				sender: getData.sender,
				message: getData.message
			})
		} else {
			chatToJson[getData.sender] = [
				{
					sender: getData.sender,
					message: getData.message
				}
			]
		}

		if (chatToJson[getData.to]) {
			chatToJson[getData.to].push({
				sender: getData.sender,
				message: getData.message
			})
		} else {
			chatToJson[getData.to] = [
				{
					sender: getData.sender,
					message: getData.message
				}
			]
		}

		await fs.writeFile('./chat.json', JSON.stringify(chatToJson), 'utf-8')
	})
})

httpServer.listen(port, () => {
	console.log(`App listen to port ${port}`)
});


