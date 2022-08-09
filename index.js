const express = require('express')
const router = require('./router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)

app.get('/', (req, res) => {
	res.send('Membuat API')
})

app.listen(3000, () => {
	console.log('App listen to port 3000')
});
