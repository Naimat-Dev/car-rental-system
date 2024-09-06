import AppError from "./../utils/appError.js";

const NODE_ENV = process.env.NODE_ENV || "production";

// Handle invalid field error (e.g., column does not exist)
const handleInvalidFieldError = (err) => {
	// Match and extract the invalid field from the error message
	const fieldMatch = err.message.match(/column "(.*?)"/);
	const invalidField = fieldMatch ? fieldMatch[1] : "Unknown field";

	const message = `Invalid field: ${invalidField}. This column does not exist in the table.`;
	return new AppError(message, 400);
};

// Handle duplicate field error (unique constraint violation)
const handleDuplicateFieldError = (err) => {
	const message = `Duplicate field value violates unique constraint ${err.constraint}. Please use another value.`;
	return new AppError(message, 400);
};

// Handle data type validation errors (e.g., wrong data type)
const handleValidationError = (err) => {
	const message = `Invalid input data type: ${err.message}.`;
	return new AppError(message, 400);
};

// Handle JWT errors
const handleJWTError = () =>
	new AppError("Invalid Token! Please log in again.", 401);

const handleJWTExpiredError = () =>
	new AppError("Your Token has expired! Please log in again.", 401);

// Send detailed error for development
const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

// Send minimal error for production
const sendErrorProd = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		res.status(500).json({
			status: "error",
			message: "Something went very wrong!",
		});
	}
};

// Main error handling middleware
export default (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (NODE_ENV === "development") {
		sendErrorDev(err, res);
	} else if (NODE_ENV === "production") {
		let error = { ...err };
		error.message = err.message;

		// Handle specific PostgreSQL errors
		if (err.code === "42703") {
			// Undefined column error
			error = handleInvalidFieldError(err);
		} else if (err.code === "23505") {
			// Unique constraint violation error
			error = handleDuplicateFieldError(err);
		} else if (err.code === "22P02") {
			// Invalid input syntax (e.g., wrong data type)
			error = handleValidationError(err);
		} else if (err.name === "JsonWebTokenError") {
			error = handleJWTError();
		} else if (err.name === "TokenExpiredError") {
			error = handleJWTExpiredError();
		}

		if (error) {
			sendErrorProd(error, res);
		} else {
			sendErrorProd(err, res);
		}
	}
};
