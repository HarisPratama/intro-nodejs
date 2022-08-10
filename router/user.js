const express = require('express');
const router = express.Router();
const fs = require('fs/promises');

const bcrypt = require('bcrypt');
const { getToken } = require('../helpers/jwt');

const db = '../nodejs/db.json';

router.get('/profile', async (req, res) => {
	try {
		if (req.error) {
			res.status(401).json({ message: req.error })
		} else {
			res.status(200).json({ data: req.userHasLogin })
		}
	} catch (error) {
		res.status(400).json({ message: JSON.stringify(error) })
	}
})

module.exports = router
