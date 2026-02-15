import User from "../models/user.models.js";
import asyncHandler from "../utils/async-handler.js";
import ApiError from "../utils/api-error.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized ");
    }

    try {
        const decodedtoken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
        );

        const user = await User.findById(decodedtoken?._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
        );

        if (!user) {
            throw new ApiError(401, "Access token invalid");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized error", error)
    }
});
