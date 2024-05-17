import { body } from "express-validator";
import {
	MIN_FIRST_NAME_LENGTH,
	MIN_LAST_NAME_LENGTH,
	GENDER,
	ID_DOCUMENT_TYPE,
	PAY_CADENCE,
	STUDY,
	STATUS,
} from "../constants/employee.constants.js";

export const createEmployeeDto = [
	body("branch_id").isUUID().withMessage("Must provide a valid Branch ID."),
	body("first_name")
		.optional()
		.isString()
		.isLength({ min: MIN_FIRST_NAME_LENGTH })
		.withMessage(
			`First name must be at least ${MIN_FIRST_NAME_LENGTH} characters long.`
		),
	body("middle_name").optional().isString(),
	body("last_name")
		.optional()
		.isString()
		.isLength({ min: MIN_LAST_NAME_LENGTH })
		.withMessage(
			`First name must be at least ${MIN_LAST_NAME_LENGTH} characters long.`
		),
	body("gender")
		.optional()
		.isIn(GENDER)
		.withMessage(`Gender status must be one of ${GENDER}`),
	body("id_document_type")
		.optional()
		.isIn(ID_DOCUMENT_TYPE)
		.withMessage(`Document Type ID must be one of ${ID_DOCUMENT_TYPE}`),
	body("pay_cadence")
		.optional()
		.isIn(PAY_CADENCE)
		.withMessage(`Pay Cadence must be one of ${PAY_CADENCE}`),
	body("study")
		.optional()
		.isIn(STUDY)
		.withMessage(`Study must be one of ${STUDY}`),
	body("status")
		.optional()
		.isIn(STATUS)
		.withMessage(`Status must be one of ${STATUS}`),
];

export const updateEmployeeDto = [
	body("branch_id").isUUID().withMessage("Must provide a valid Branch ID."),
	body("first_name")
		.optional()
		.isString()
		.isLength({ min: MIN_FIRST_NAME_LENGTH })
		.withMessage(
			`First name must be at least ${MIN_FIRST_NAME_LENGTH} characters long.`
		),
	body("middle_name").optional().isString(),
	body("last_name")
		.optional()
		.isString()
		.isLength({ min: MIN_LAST_NAME_LENGTH })
		.withMessage(
			`First name must be at least ${MIN_LAST_NAME_LENGTH} characters long.`
		),
	body("gender")
		.optional()
		.isIn(GENDER)
		.withMessage(`Gender status must be one of ${GENDER}`),
	body("id_document_type")
		.optional()
		.isIn(ID_DOCUMENT_TYPE)
		.withMessage(`Document Type ID must be one of ${ID_DOCUMENT_TYPE}`),
	body("pay_cadence")
		.optional()
		.isIn(PAY_CADENCE)
		.withMessage(`Pay Cadence must be one of ${PAY_CADENCE}`),
	body("study")
		.optional()
		.isIn(STUDY)
		.withMessage(`Study must be one of ${STUDY}`),
	body("status")
		.optional()
		.isIn(STATUS)
		.withMessage(`Status must be one of ${STATUS}`),
];
