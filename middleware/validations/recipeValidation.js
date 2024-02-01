// middleware/validations/recipeValidation.js
const { body } = require("express-validator");

const validateCreateRecipe = [
  body("title")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Recipe title is required")
    .isLength({ max: 100 })
    .withMessage("Recipe title must be less than 100 characters")
    .custom((value, { req }) => {
      // Skip matches check if the title is empty or null
      if (!value) {
        return true;
      }
      // Perform the matches check
      return /^[a-zA-Z\s,'-]+$/i.test(value);
    })
    .withMessage(
      "Recipe title can only contain letters, spaces, commas, apostrophes and hyphens"
    ),

  body("description")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Recipe description is required")
    .isLength({ max: 250 })
    .withMessage("Recipe description must be less than 250 characters"),
];

module.exports = {
  validateCreateRecipe,
};
