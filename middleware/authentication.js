const User = require("../models/User");
const jsonwebtoken = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer "))
		throw new UnauthenticatedError("Authentication failed.");
	const token = authHeader.split(" ")[1];

	try {
		const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
		// attach the user to job routes
		req.user = { userId: payload.userId, name: payload.name };
		next();
	} catch (err) {
		throw new UnauthenticatedError("Authentication failed.");
	}
};

module.exports = auth;
