import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const recipeSchema = mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            default: uuidv4,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        ingredients: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        steps: {
            type: [String],
            required: true,
        }
    },
    { timestamps: true },
);

const Recipe = mongoose.model("RECIPE", recipeSchema);

export default Recipe;