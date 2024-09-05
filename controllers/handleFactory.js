import db from "../config/db";
import AppError from "../utils/appError";

// CREATE One Document
export const createOne = (Table) =>
	catchAsync(async (req, res, next) => {
		const doc = await db(Table).insert(req.body);

		if (!doc) {
			return next(new AppError(`${docName} could not be created`, 400));
		}

		res.status(201).json({
			status: "success",
			doc,
		});
	});
