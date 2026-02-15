import { body } from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be lowercase")
            .isLength({ min: 3 })
            .withMessage("Username must be at least 3 characters"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ];
};

const userLoginValidator = () => {
    return [
        body("email")
            .optional()
            .trim()
            .isEmail()
            .withMessage("Invalid email"),
        body("username")
            .optional()
            .trim()
            .isLowercase()
            .withMessage("Username should be lowercase only")
            .isLength({ min: 3 })
            .withMessage("Username should be at least 3 characters long"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
    ];
};

export { userRegisterValidator, userLoginValidator };