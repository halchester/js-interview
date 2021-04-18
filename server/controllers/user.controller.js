const jwt = require('jsonwebtoken');

exports.getAllRandomThings = async (req, res) => {
	const things = require('../data.json');
	things
		? res.status(200).json({ success: true, data: things })
		: res.status(400).json({ success: false, data: {} });
};

exports.registerUser = async (req, res) => {
	const { email, password, id } = req.body;
	console.log(email, password, id);
	try {
		const token = jwt.sign({ id }, 'Some random token words');
		res.header(('Auth', token));
		res.send(token);
		res.status(200).json({ success: true, data: { email, password, id } });
	} catch (err) {
		res.status(400).json({ success: false, error: err });
	}
};

exports.processThing = async (req, res) => {
	let token = req.headers.jwtsvestedthing;
	token
		? res.status(200).json({ success: true, data: {} })
		: res.status(400).json({ success: false, data: {} });
};
