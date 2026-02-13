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

const userLoginValidator = () => {
    return [
        body("email")
            .notEmpty()
            .withMessage("Please enter your email")
            .trim()
            .isEmail()
            .withMessage("Invalid email"),
        body("username")
            .isEmpty()
            .withMessage("Please enter your username")
            .trim()
            .isLowercase()
            .withMessage("Username should be lowercase only")
            .isLength({ min: 3 })
            .withMessage("Username should be atlelast 3 charaters long"),
    ];
};

export { userRegisterValidator, userLoginValidator };
