const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
	let customError = {
		StatusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something went wrong try again later.",
	};
	// if (err instanceof CustomAPIError) {
	// 	return res.status(err.statusCode).json({ msg: err.message });
	// }
	if (err.code && err.code === 11000) {
		customError.msg = `Duplicate value entered for ${Object.keys(
			err.keyValue
		)} field, please choose another value`;
		customError.StatusCode = StatusCodes.BAD_REQUEST;
	}
	if (err.name === "ValidationError") {
		customError.msg = Object.values(err.errors)
			.map((err) => err.message)
			.join(", ");
		customError.StatusCode = StatusCodes.BAD_REQUEST;
	}
	if (err.name === "CastError") {
		customError.msg = `No item found with id ${err.value}.`;
		customError.StatusCode = StatusCodes.NOT_FOUND;
	}
	// return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
	return res.status(customError.StatusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
