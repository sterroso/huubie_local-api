import { body } from "express-validator";
import {
  MIN_FIRST_NAME_LENGTH,
  MIN_MIDDLE_NAME_LENGTH,
  MIN_LAST_NAME_LENGTH,
  MIN_ADDRESS_LENGTH,
  MIN_TAX_ID_LENGTH,
  MAX_TAX_ID_LENGTH,
  GENDER,
  ID_DOCUMENT_TYPE,
  PAY_CADENCE,
  STUDY,
  STATUS,
  MAX_TELEPHONE_NUMBER,
  MIN_ID_DOCUMENT_NUMBER_LENGTH,
  MIN_SSN_LENGTH,
  MIN_BANK_ACCOUNT_NUMBER
} from "../constants/employee.constants.js";

export const createEmployeeDto = [
  body("first_name")
    .isString()
    .isLength({ min: MIN_FIRST_NAME_LENGTH })
    .withMessage(
      `Must provide a valid first name with at least ${
        MIN_FIRST_NAME_LENGTH
      } characters long.`
    ),
  body("middle_name")
    .optional()
    .isString()
    .isLength({ min: MIN_MIDDLE_NAME_LENGTH })
    .withMessage(
      `Must provide a valid middle name with at least ${
        MIN_MIDDLE_NAME_LENGTH
      } characters long.`
    ),
  body("last_name")
    .isString()
    .isLength({ min: MIN_LAST_NAME_LENGTH })
    .withMessage(
      `Must provide a valid last name with at least ${
        MIN_LAST_NAME_LENGTH
      } characters long.`
    ),
  body("branch_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid Branch ID."
    ),
  body("area_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid Area ID."
    ),
  body("position_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid Position ID."
    ),
  body("shift_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid Shift ID."
    ),
  body("manager_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid Manager ID."
    ),
  body("user_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid User ID."
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
  body("address_city")
    .optional()
    .isString()
    .isLength({ min: MIN_ADDRESS_LENGTH })
    .withMessage(
      `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
    ),
  body("address_state")
    .optional()
    .isString()
    .isLength({ min: MIN_ADDRESS_LENGTH })
    .withMessage(
      `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
    ),
  body("address_zip_code")
    .optional()
    .isString(),
  body("is_manager")
    .optional()
    .isBoolean(),
  body("email")
    .optional()  
    .isEmail()
    .withMessage(
      "Must be a valid e-mail address."
    ),
  body("telephone_number")
    .optional()
    .isString()
    .isLength({ max: MAX_TELEPHONE_NUMBER })
    .withMessage(
      `The Telephone Number cannot exceed ${
        MAX_TELEPHONE_NUMBER
      } digits.`
    ),
  body("tax_id")
    .optional()
    .isString()
    .isLength({ min: MIN_TAX_ID_LENGTH, max: MAX_TAX_ID_LENGTH })
    .withMessage(
      `Must provide a valid tax id number, between ${MIN_TAX_ID_LENGTH} and ${MAX_TAX_ID_LENGTH} characters long.`
    ),
  body("date_of_birth")
    .optional()
    .isDate()
    .withMessage(
      "Must provide a valid date of birth."
    ),
  body("city_of_birth")
    .optional()
    .isString()
    .withMessage("City of birth must be a valid string.")
    .isLength({ min: MIN_CITY_OF_BIRTH_LENGTH })
    .withMessage(
      `City of birth must be at least ${
        MIN_CITY_OF_BIRTH_LENGTH
      } characters long.`
    ),
  body("gender")
    .optional()
    .isString()
    .withMessage(
      `Must provide a valid gender: ${
        GENDER
      }.`
    ),
  body("study")
    .optional()
    .isString()
    .withMessage(
       `Must provide a valid study: ${
        STUDY
      }.`
    ),
  body("id_document_type")
    .optional()
    .isString()
    .custom(value => {
      if (!ID_DOCUMENT_TYPE.includes(value)) {
        throw new Error(`Invalid pay cadence. Must be one of: ${ID_DOCUMENT_TYPE.join(', ')}`);
      }
      return true;
    }),
  body("id_document_number")
    .optional()
    .isString()
    .isLength({ min: MIN_ID_DOCUMENT_NUMBER_LENGTH })
    .withMessage(
      `ID document number must be at least ${
        MIN_ID_DOCUMENT_NUMBER_LENGTH
      } characters long.`
    ),
  body("citizen_id_number")
    .optional()
    .isString()
    .isLength({ min: MIN_CITIZEN_ID_NUMBER_LENGTH })
    .withMessage(
      `Citizen ID number must be at least ${
        MIN_CITIZEN_ID_NUMBER_LENGTH
      } characters long.`
    ),
  body("ssn")
    .optional()
    .isString()
    .isLength({ min: MIN_SSN_LENGTH })
    .withMessage(
      `SSN must be a valid Social Security Number with at least ${
        MIN_SSN_LENGTH
      } characters long.`
    ),   
  body("ssn_issue_date")
    .optional()
    .isDate()
    .withMessage(
      "Must provide a valid date for SSN issue date."
    ),
  body("pay_cadence")
    .optional()
    .isString()
    .custom(value => {
      if (!PAY_CADENCE.includes(value)) {
        throw new Error(`Invalid pay cadence. Must be one of: ${PAY_CADENCE.join(', ')}`);
      }
      return true;
    }),
  body("daily_wage")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for daily wage."
    ),
  body("attendance_bonus")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for attendance bonus."
    ),
  body("other_bonus")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for other bonus."
    ),
  body("incentives")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for incentives."
    ),
  body("complimentary_payroll")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for complimentary payroll."
    ),
  body("regular_payroll")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for regular payroll."
    ),
  body("bank_name")
    .optional()
    .isString()
    .isLength({ min: MIN_FIRST_NAME_LENGTH })
    .withMessage(
      `Must provide a valid Bank name with at least ${
        MIN_FIRST_NAME_LENGTH
      } characters long.`
    ),
  body("bank_account_number")
    .optional()
    .isString()
    .isLength({ min: MIN_BANK_ACCOUNT_NUMBER })
    .withMessage(
      `Must provide a valid bank acount number with at least ${
        MIN_BANK_ACCOUNT_NUMBER
      } characters long.`
    ),
  body("date_of_hire")
    .optional()
    .isDate()
    .withMessage(
      "Must provide a valid date for SSN issue date."
    ),
  body("date_of_termination")
    .optional()
    .isDate()
    .withMessage(
      "Must provide a valid date for SSN issue date."
    ),
  body("status")
    .optional()
    .isString()
    .custom(value => {
      if (!STATUS.includes(value)) {
        throw new Error(`Invalid status. Must be one of: ${STATUS.join(', ')}`);
      }
      return true;
    }),
  body("housing_credit_number")
    .optional()
    .isString()
    .isLength({ min: MIN_HOUSING_CREDIT_NUMBER_LENGTH })
    .withMessage(
      `Must provide a valid Housing Credit Number with at least ${
        MIN_HOUSING_CREDIT_NUMBER_LENGTH
      } characters long.`
    ),
  body("has_social_security")
    .optional()
    .isBoolean(),
  body("has_housing_credit")
    .optional()
    .isBoolean(),
  body("id_document_copy")
    .optional()
    .isBoolean(),
  body("citizen_id_copy")
    .optional()
    .isBoolean(),
  body("job_application_form")
    .optional()
    .isBoolean(),
  body("proof_of_address")
    .optional()
    .isBoolean(),
  body("proof_of_studies")
    .optional()
    .isBoolean(),
]

export const updateEmployeeDto = [
  body("first_name")
    .isString()
    .isLength({ min: MIN_FIRST_NAME_LENGTH })
    .withMessage(
      `Must provide a valid first name with at least ${
        MIN_FIRST_NAME_LENGTH
      } characters long.`
    ),
  body("middle_name")
    .optional()
    .isString()
    .isLength({ min: MIN_MIDDLE_NAME_LENGTH })
    .withMessage(
      `Must provide a valid middle name with at least ${
        MIN_MIDDLE_NAME_LENGTH
      } characters long.`
    ),
  body("last_name")
    .isString()
    .isLength({ min: MIN_LAST_NAME_LENGTH })
    .withMessage(
      `Must provide a valid last name with at least ${
        MIN_LAST_NAME_LENGTH
      } characters long.`
    ),
  body("branch_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid Branch ID."
    ),
  body("area_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid Area ID."
    ),
  body("position_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid Position ID."
    ),
  body("shift_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid Shift ID."
    ),
  body("manager_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid Manager ID."
    ),
  body("user_id")
    .optional()
    .isUUID()
    .withMessage(
      "Must provide a valid User ID."
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
  body("address_city")
    .optional()
    .isString()
    .isLength({ min: MIN_ADDRESS_LENGTH })
    .withMessage(
      `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
    ),
  body("address_state")
    .optional()
    .isString()
    .isLength({ min: MIN_ADDRESS_LENGTH })
    .withMessage(
      `Address must be at least ${MIN_ADDRESS_LENGTH} characters long.`
    ),
  body("address_zip_code")
    .optional()
    .isString(),
  body("is_manager")
    .optional()
    .isBoolean(),
  body("email")
    .optional()  
    .isEmail()
    .withMessage(
      "Must be a valid e-mail address."
    ),
  body("telephone_number")
    .optional()
    .isString()
    .isLength({ max: MAX_TELEPHONE_NUMBER })
    .withMessage(
      `The Telephone Number cannot exceed ${
        MAX_TELEPHONE_NUMBER
      } digits.`
    ),
  body("tax_id")
    .optional()
    .isString()
    .isLength({ min: MIN_TAX_ID_LENGTH, max: MAX_TAX_ID_LENGTH })
    .withMessage(
      `Must provide a valid tax id number, between ${MIN_TAX_ID_LENGTH} and ${MAX_TAX_ID_LENGTH} characters long.`
    ),
  body("date_of_birth")
    .optional()
    .isDate()
    .withMessage(
      "Must provide a valid date of birth."
    ),
  body("city_of_birth")
    .optional()
    .isString()
    .withMessage("City of birth must be a valid string.")
    .isLength({ min: MIN_CITY_OF_BIRTH_LENGTH })
    .withMessage(
      `City of birth must be at least ${
        MIN_CITY_OF_BIRTH_LENGTH
      } characters long.`
    ),
  body("gender")
    .optional()
    .isString()
    .withMessage(
      `Must provide a valid gender: ${
        GENDER
      }.`
    ),
  body("study")
    .optional()
    .isString()
    .withMessage(
       `Must provide a valid study: ${
        STUDY
      }.`
    ),
  body("id_document_type")
    .optional()
    .isString()
    .custom(value => {
      if (!ID_DOCUMENT_TYPE.includes(value)) {
        throw new Error(`Invalid pay cadence. Must be one of: ${ID_DOCUMENT_TYPE.join(', ')}`);
      }
      return true;
    }),
  body("id_document_number")
    .optional()
    .isString()
    .isLength({ min: MIN_ID_DOCUMENT_NUMBER_LENGTH })
    .withMessage(
      `ID document number must be at least ${
        MIN_ID_DOCUMENT_NUMBER_LENGTH
      } characters long.`
    ),
  body("citizen_id_number")
    .optional()
    .isString()
    .isLength({ min: MIN_CITIZEN_ID_NUMBER_LENGTH })
    .withMessage(
      `Citizen ID number must be at least ${
        MIN_CITIZEN_ID_NUMBER_LENGTH
      } characters long.`
    ),
  body("ssn")
    .optional()
    .isString()
    .isLength({ min: MIN_SSN_LENGTH })
    .withMessage(
      `SSN must be a valid Social Security Number with at least ${
        MIN_SSN_LENGTH
      } characters long.`
    ),   
  body("ssn_issue_date")
    .optional()
    .isDate()
    .withMessage(
      "Must provide a valid date for SSN issue date."
    ),
  body("pay_cadence")
    .optional()
    .isString()
    .custom(value => {
      if (!PAY_CADENCE.includes(value)) {
        throw new Error(`Invalid pay cadence. Must be one of: ${PAY_CADENCE.join(', ')}`);
      }
      return true;
    }),
  body("daily_wage")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for daily wage."
    ),
  body("attendance_bonus")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for attendance bonus."
    ),
  body("other_bonus")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for other bonus."
    ),
  body("incentives")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for incentives."
    ),
  body("complimentary_payroll")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for complimentary payroll."
    ),
  body("regular_payroll")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Must provide a valid integer value for regular payroll."
    ),
  body("bank_name")
    .optional()
    .isString()
    .isLength({ min: MIN_FIRST_NAME_LENGTH })
    .withMessage(
      `Must provide a valid Bank name with at least ${
        MIN_FIRST_NAME_LENGTH
      } characters long.`
    ),
  body("bank_account_number")
    .optional()
    .isString()
    .isLength({ min: MIN_BANK_ACCOUNT_NUMBER })
    .withMessage(
      `Must provide a valid bank acount number with at least ${
        MIN_BANK_ACCOUNT_NUMBER
      } characters long.`
    ),
  body("date_of_hire")
    .optional()
    .isDate()
    .withMessage(
      "Must provide a valid date for SSN issue date."
    ),
  body("date_of_termination")
    .optional()
    .isDate()
    .withMessage(
      "Must provide a valid date for SSN issue date."
    ),
  body("status")
    .optional()
    .isString()
    .custom(value => {
      if (!STATUS.includes(value)) {
        throw new Error(`Invalid status. Must be one of: ${STATUS.join(', ')}`);
      }
      return true;
    }),
  body("housing_credit_number")
    .optional()
    .isString()
    .isLength({ min: MIN_HOUSING_CREDIT_NUMBER_LENGTH })
    .withMessage(
      `Must provide a valid Housing Credit Number with at least ${
        MIN_HOUSING_CREDIT_NUMBER_LENGTH
      } characters long.`
    ),
  body("has_social_security")
    .optional()
    .isBoolean(),
  body("has_housing_credit")
    .optional()
    .isBoolean(),
  body("id_document_copy")
    .optional()
    .isBoolean(),
  body("citizen_id_copy")
    .optional()
    .isBoolean(),
  body("job_application_form")
    .optional()
    .isBoolean(),
  body("proof_of_address")
    .optional()
    .isBoolean(),
  body("proof_of_studies")
    .optional()
    .isBoolean(),
]