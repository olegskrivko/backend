// models/ingredientModel.js
const mongoose = require("mongoose");
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    // required: true,
    trim: true,
    maxlength: 250,
  },
  calories: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  carbohydrates: {
    type: Number,
    required: true,
  },
  fiber: {
    type: Number,
    required: true,
  },
  sugar: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    enum: ["solid", "liquid", "powder", "granule", "other"], // Add other states as needed
    required: true,
  },

  allowedUnits: [
    {
      unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
        required: true,
      },
      conversionFactor: {
        type: Number,
        required: true,
      },
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IngredientCategory",
    required: true,
  },
  ingredientPrices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IngredientPrice",
    },
  ],
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],

  slug: {
    type: String,
    unique: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
});

// ingredientSchema.plugin(deepPopulate, {});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;

// Calories 489
// Total Fat 36g
//    Saturated Fat 14g
//    Trans Fat 0.4g
//    Polyunsaturated Fat 5.4g
//    Monounsaturated Fat 13g
// Cholesterol 620mg milligrams 207% Daily Value
// Sodium 977mg milligrams 42% Daily Value
//    Total Carbohydrates 2.5g grams 1% Daily Value
//    Dietary Fiber 0g grams 0% Daily Value
// Sugars 0.7g grams
// Protein 37g

// Vitamin D 3.3mcg micrograms 16% Daily Value
// Calcium 287mg milligrams 22% Daily Value
// Iron 3mg milligrams 17% Daily Value
// Potassium 400.4mg milligrams 9%

//Caffeine 0mg

// Micronutrients
// Phosphorus, P 	261.3 mg
// Potassium, K 	193.4 mg
// Caffeine 	0.00 mg

// Grouped food list

// Milk;

// denmark

// Milk and milk preserves
// Cheese and cheese products
// Ice cream
// Cereals and starch products
// Vegetables and vegetable products
// Fruit, berries and their products
// Meat and meat products
// Fish, quatic animals and their products
// Poultry
// Eggs and egg products
// Fats and fatty products
// Sugar, honey and sugar confectionery
// Beverages
// Spices and extracts etc.
// Ready meals, fastfood and composite foods
// Foods for particular nutritional uses
// Other foods
// Substitutes for animal products
// Legumes and legume products
// Nuts and high-fat seeds

// ===============================

// 01 MILK, MILK PRODUCT OR MILK SUBSTITUTE
// 02 EGG OR EGG PRODUCT
// 03 MEAT OR MEAT PRODUCT
// 04 SEAFOOD OR RELATED PRODUCT
// 05 FAT OR OIL
// 06 GRAIN OR GRAIN PRODUCT
// 07 NUT, SEED OR KERNEL PRODUCT
// 08 VEGETABLE OR VEGETABLE PRODUCT
// 09 FRUIT OR FRUIT PRODUCT
// 10 SUGAR OR SUGAR PRODUCT
// 11 BEVERAGE (NON-MILK)
// 12 MISCELLANEOUS FOOD PRODUCT
// 13 PRODUCT FOR SPECIAL NUTRITIONAL USE OR DIETARY SUPPLEMENT

// ===============================

// Fruits	                  Fresh, ripe, and naturally sweet produce typically consumed as a snack or used in various dishes.
// Vegetables	              Edible plants that are commonly used in cooking, offering a wide range of flavors, textures, and nutritional benefits.
// Meat	                    Animal flesh, often from mammals, used as a primary protein source in many cuisines.
// Poultry	                Domesticated birds such as chicken, turkey, and duck, commonly prepared as a main dish.
// Seafood	                Edible aquatic animals, including fish and shellfish, known for their unique flavors and nutritional richness.
// Dairy	                  Products derived from milk, such as cheese, milk, and yogurt, known for their calcium and protein content.
// Grains	                  Cereal crops and their products, including rice, wheat, oats, and quinoa, providing a staple source of carbohydrates.
// Nuts and Seeds	          Edible kernels often rich in healthy fats, protein, and various essential nutrients.
// Legumes	                Plant-based foods like beans, lentils, and peas, known for their high protein and fiber content.
// Herbs and Spices	        Flavorful plant parts used to season and enhance the taste of dishes, ranging from basil to cinnamon.
// Oils and Fats	          Cooking oils and fats used for frying, sautéing, and flavoring dishes.
// Condiments and Sauces	  Flavorful additions to meals, including ketchup, mustard, soy sauce, and various dressings.
// Beverages	              Various liquid refreshments, including water, juices, teas, and coffee.
// Sweeteners	              Substances used to add sweetness to foods and beverages, such as sugar, honey, and maple syrup.
// Baking Ingredients	      Essential components for baking, including flour, sugar, baking powder, and yeast.
// Snacks	                  Convenient and often portable foods consumed between meals, such as chips, nuts, and dried fruits.
// Miscellaneous	          Other food items that may not fit into specific categories, providing a diverse range of options.
