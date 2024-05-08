import { body } from "express-validator";
import {
  MIN_LEGAL_NAME_LENGTH,
  MIN_TAX_ID_LENGTH,
  MAX_TAX_ID_LENGTH,
  MIN_ADDRESS_LENGTH,
  SUBSCRIPTION_STATUS
} from "../constants/entity.constants.js";

export const createEntityDto = [
  body("legal_name")
    .isString()
    .isLength({ min: MIN_LEGAL_NAME_LENGTH })
    .withMessage(
      `Must provide a valid legal name with at least ${
        MIN_LEGAL_NAME_LENGTH
      } characters long.`
    ),
  body("tax_id")
    .isString()
    .isLength({ min: MIN_TAX_ID_LENGTH, max: MAX_TAX_ID_LENGTH })
    .withMessage(
      `Must provide a valid tax id number, between ${
        MIN_TAX_ID_LENGTH
      } and ${
        MAX_TAX_ID_LENGTH
      } characters long.`
    ),
  body("address_line_one")
    .optional()
    .isLength({ min: MIN_ADDRESS_LENGTH })
    .withMessage(
      `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
    ),
  body("address_line_two")
    .optional()
    .isLength({ min: MIN_ADDRESS_LENGTH })
    .withMessage(
      `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
    ),
  body("subscription_status")
    .optional()
    .isString()
    .isIn(SUBSCRIPTION_STATUS)
    .withMessage(`Subscription status must be one of ${SUBSCRIPTION_STATUS}`),
];

export const updateEntityDto = [
  body("legal_name")
    .optional()
    .isString()
    .isLength({ min: MIN_LEGAL_NAME_LENGTH })
    .withMessage(
      `Must provide a valid legal name with at least ${MIN_LEGAL_NAME_LENGTH} characters long.`
    ),
  body("tax_id")
    .optional()
    .isString()
    .isLength({ min: MIN_TAX_ID_LENGTH, max: MAX_TAX_ID_LENGTH })
    .withMessage(
      `Must provide a valid tax id number, between ${MIN_TAX_ID_LENGTH} and ${MAX_TAX_ID_LENGTH} characters long.`
    ),
  body("address_line_one")
    .optional()
    .isString()
    .isLength({ min: MIN_ADDRESS_LENGTH })
    .withMessage(
      `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
    ),
  body("address_line_two")
    .optional()
    .isString()
    .isLength({ min: MIN_ADDRESS_LENGTH })
    .withMessage(
      `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
    ),
  body("subscription_status")
    .optional()
    .isString()
    .isIn(SUBSCRIPTION_STATUS)
    .withMessage(`Subscription status must be one of ${SUBSCRIPTION_STATUS}`),
];
