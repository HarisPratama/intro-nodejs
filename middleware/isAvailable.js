

const checkIfAvailable = (req, res, next) => {
	if (req.query.condition === 'pass') {
		next()
	} else {
		res.status(401).json({message: 'Unautorized'})
	}
}


module.exports = checkIfAvailable;

