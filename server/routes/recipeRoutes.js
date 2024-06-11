import express from "express";
import { createRecipeController, getRecipesController, getRecipeByAuthorController,getRecipeByIdController, searchRecipesByKeywordController, updateRecipeController, deleteRecipeController, } from "../controllers/recipeControllers.js";

// Router to access Authorisation related routes
const recipeRouter = express.Router();

// Routes

/**
 * @recipeRouter /api/v1/recipe/create-recipe
 * @description Create recipe
 * @access public
 */
recipeRouter.post("/create-recipe", createRecipeController);

/**
 * @recipeRouter /api/v1/recipe/get-recipes
 * @description Get recipes
 * @access public
 */
recipeRouter.get("/get-recipes", getRecipesController);

/**
 * @recipeRouter /api/v1/recipe/get-recipe-by-author
 * @description Get recipes
 * @access public
 */
recipeRouter.post("/get-recipe-by-author", getRecipeByAuthorController);

/**
 * @recipeRouter /api/v1/recipe/get-recipe-by-id/:id
 * @description Get recipes
 * @access public
 */
recipeRouter.get("/get-recipe-by-id/:id", getRecipeByIdController);

/**
 * @recipeRouter /api/v1/recipe/get-recipe-by-keyword/:keyword
 * @description Get recipes By Keyword
 * @access public
 */
recipeRouter.get("/get-recipe-by-keyword/:keyword", searchRecipesByKeywordController);

/**
 * @recipeRouter /api/v1/recipe/update-recipe
 * @description Update recipe
 * @access public
 */
recipeRouter.put("/update-recipe", updateRecipeController);

/**
 * @recipeRouter /api/v1/recipe/delete-recipe
 * @description Delete recipe
 * @access public
 */
recipeRouter.put("/delete-recipe", deleteRecipeController);


// Exporting Router
export default recipeRouter;