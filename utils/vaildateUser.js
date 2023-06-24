const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array()[0].msg; 
      return res.status(400).json({ error: errorMessage }); 
    }
    next();
  },
];

module.exports = validateUser;
