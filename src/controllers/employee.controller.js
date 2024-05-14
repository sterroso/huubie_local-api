import { validationResult } from 'express-validator';

export const createEmployee = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getEmployeeById = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getAllEmployeesByBranchId = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getAllEmployeesByEntityId = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateEmployee = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteEmployee = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}