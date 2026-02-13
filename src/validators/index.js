import { body } from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .trim()
            .isEmail()
            .withMessage("Email is invalid"),
        body("username")
            .notEmpty()
            .withMessage("Username is required")
            .trim()
            .isLowercase()
            .withMessage("Username must be lowercase")
            .isLength({ min: 3 })
            .withMessage("Username must be atleast 3 characters"),
        body("password")
            .notEmpty()
            .withMessage("Please enter a password")
            .trim(),
    ];
};

export { userRegisterValidator };
