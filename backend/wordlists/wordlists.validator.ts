import { body } from "express-validator"

const createWordlistValidator = [
  body('module').not().isEmpty().withMessage('module is required').trim().isString().withMessage('module needs to be in text format'),
  body('chapterName').not().isEmpty().withMessage('chapter name is required').trim().isString().withMessage('chapter name needs to be in text format'),
]

export default createWordlistValidator