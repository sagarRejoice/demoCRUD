const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide name."],
		trim: true,
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: [true, "Please provide email."],
		trim: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide valid email",
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide password."],
		trim: true,
		minlength: 6,
	},
});

UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userId: this._id, name: this.name },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	);
};

UserSchema.methods.comparePassword = async function (password) {
	try {
		const isMatch = await bcryptjs.compare(password, this.password);
		return isMatch;
	} catch (error) {}
};

UserSchema.pre("save", async function () {
	const salt = await bcryptjs.genSalt(10);
	this.password = await bcryptjs.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
