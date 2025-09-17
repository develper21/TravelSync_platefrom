import { body, validationResult } from 'express-validator';

export const signupValidator = [
  body('fullName')
    .notEmpty()
    .withMessage('Full Name is required.')
    .isLength({ min: 3 })
    .withMessage('Full Name must be at least 3 characters long.'),
  
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
];

export const signinValidator = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required.'),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};