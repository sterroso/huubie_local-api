import {body} from "express-validator";
import{
  MIN_NAME_LENGTH,
  MIN_ADDRESS_LENGTH
} from "../constants/branches.constants.js"

export const createBranchDto = [
  body("name")
  .isString()
  .isLength({min:  MIN_NAME_LENGTH})
  .withMessage(
    `Must provide a valid name with at least 
    ${MIN_NAME_LENGTH
    } characters long.`
  ),
  body("address_line_one")
  .optional()
  .isLength({min: MIN_ADDRESS_LENGTH})
  .withMessage(
    `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
  ),
  body("address_line_two")
  .optional()
  .isLength({min: MIN_ADDRESS_LENGTH })
  .withMessage(
    `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
  ),
  body("entity_id")
  .isUUID()
  .withMessage("Must provide a valid emptity id")
]

export const updateBranchDto = [
  body("name")
  .isString()
  .isLength({min:  MIN_NAME_LENGTH})
  .withMessage(
    `Must provide a valid name with at least 
    ${MIN_NAME_LENGTH
    } characters long.`
  ),
  body("address_line_one")
  .optional()
  .isLength({min: MIN_ADDRESS_LENGTH})
  .withMessage(
    `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
  ),
  body("address_line_two")
  .optional()
  .isLength({min: MIN_ADDRESS_LENGTH })
  .withMessage(
    `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
  )
]

