const express = require('express')
const cors = require('cors')

const router = require('./router')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true, bodyParser: true}))

app.use(router)

app.get('/', (req, res) => {
	res.send('Membuat API')
})

app.listen(3001, () => {
	console.log('App listen to port 3000')
});
