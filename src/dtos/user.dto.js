import { body } from "express-validator";
import {
  MIN_PASSWORD_LENGTH,
  MIN_FIRST_NAME_LENGTH,
  MIN_LAST_NAME_LENGTH
} from '../constants/user.constants.js'

export const createUserDto = [
  body("email").isEmail().withMessage("Must be a valid e-mail address."),
  body("password")
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
    ),
  body("entity_id").isUUID().withMessage("Must provide a valid Entity ID."),
  body("first_name").optional().isString(),
  body("middle_name").optional().isString(),
  body("last_name").optional().isString(),
  body("avatar_url").optional().isURL().withMessage("Must be a valid URL."),
];

export const updateUserDto = [
  body("first_name")
    .isString()
    .isLength({ min: MIN_FIRST_NAME_LENGTH })
    .withMessage(
      `First name must be at least ${MIN_FIRST_NAME_LENGTH} characters long.`
    ),
  body("middle_name").optional().isString(),
  body("last_name")
    .isString()
    .isLength({ min: MIN_LAST_NAME_LENGTH })
    .withMessage(
      `First name must be at least ${MIN_LAST_NAME_LENGTH} characters long.`
    ),
];

export const updateUserPasswordDto = [
  body("password")
    .isString()
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
    ),
  body("passwordChangeAuthorizationToken")
    .isString()
    .withMessage("Must provide a valid password change authorization token."),
];

export const updateEmailDto = [
  body("email").isEmail().withMessage("Must provide a valid e-mail address."),
  body("emailChangeAuthorizationToken")
    .isString()
    .withMessage(
      "Must provide a valid e-mail address change authorization token."
    )
];

export const confirmEmailDto = [
  body("email")
    .isEmail()
    .withMessage("Must provide a valid e-mail address."),
  body("emailConfirmationToken")
    .isString()
    .withMessage(
      "Must provide a valid e-mail address confirmation token."
    )
];
