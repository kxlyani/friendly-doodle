import User from "../models/user.models.js";
import ApiResponse from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import { VerificationEmail,  sendEmail } from "../utils/mail.js";

const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, `Error generating tokens: ${error}`);
    }
};

const registerUser = asyncHandler(async (req, res) => {
    // 1. get data
    const { username, email, password, role } = req.body;

    // 2. validate
    const registeredUser = await User.findOne({
    $or: [{ username }, { email }],
});


    // 3. check if user exists in db
    if (registeredUser) {
        throw new ApiError(409, "User already exists");
    }

    // 4. save user
    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false,
    });

    // 4.1 generate tokens
    const { unhashedToken, hashedToken, tokenExpiry } =
        user.generateTemporaryToken();

    // generateTokens();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;
    await user.save({ validateBeforeSave: false });


    await sendEmail({
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent: VerificationEmail(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`,
        ),
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering a user",
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                { user: createdUser },
                "User registered successfully and verification email has been sent on your email",
            ),
        );
});

export default registerUser;
