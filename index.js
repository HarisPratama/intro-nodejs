const express = require('express')
const cors = require('cors')

const router = require('./router');
const ViewController = require('./controllers/ejs');

const port = 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)

app.get('/', (req, res) => {
	res.send('Membuat API')
})

app.get('/view', ViewController.home)

app.listen(port, () => {
	console.log(`App listen to port ${port}`)
});
