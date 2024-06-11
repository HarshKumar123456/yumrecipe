import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const RecipePage = () => {
    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState({
        id: "123",
        title: "Recipe Not Found",
        description: "Make your yum recipe",
        ingredients: "Aloo,baigan",
        image: "https://picsum.photos/400",
        steps: ["Sabse pahle paani lo", "Phir gas on karo", "Banao aur khao", "Phir bartan dhokar rakh do",],
    });

    const serverURI = import.meta.env.VITE_SERVER_URI;

    const getRecipes = async () => {
        try {
            const response = await axios.get(`${serverURI}/api/v1/recipe/get-recipe-by-id/${recipeId}`);
            if (response.data.success && response.data.recipe) {
                setRecipe(response.data.recipe);
            }
            else {
                toast.error("Recipe not found....")
                toast.error(`${response.data.message}`);
                setTimeout(() => {
                    navigate(`/recipe/${recipeId}`);
                }, 2000);
            }

        } catch (error) {
            console.error(error);
            toast.error("Recipe not found....")
            toast.error(`${error.message}`);
            setTimeout(() => {
                navigate(`/recipe/${recipeId}`);
            }, 2000);
        }
    };

    useEffect(() => {
        getRecipes();
    }, []);

    return <>
        <Layout>
            <div className="recipe-container p-4 py-8 mb-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="recipe-image flex justify-center">
                    <img src={recipe.image} alt="recipe-image" className="rounded-md max-h-96" />
                </div>
                <div className="recipe-details flex flex-col gap-y-8">
                    <div className="recipe-info">
                        <h2 className="text-4xl">
                            {recipe.title}
                        </h2>
                        <p>{recipe.description}</p>
                        <p className="mt-2">
                            <span className="font-bold"> Ingredients: </span>
                             {recipe.ingredients}
                        </p>
                    </div>

                    <div className="recipe-steps flex flex-col gap-y-4">
                        {recipe && recipe.steps && recipe.steps.map((step, index) => (
                            <div key={index} className="recipe-step">
                                <h3 className="text-2xl">
                                    {`Step: ${index + 1} `}
                                </h3>
                                {step}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    </>;
}

export default RecipePage;