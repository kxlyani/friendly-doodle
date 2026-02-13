import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

// export const validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     return next();
//   }
//   const extractedErrors = [];
//   errors.array().map((err) =>
//     extractedErrors.push({
//       [err.path]: err.msg,
//     }),
//   );
//   throw new ApiError(422, "Recieved data is not valid", extractedErrors);
// };

export const validate = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
  });
};

// export default validate;

