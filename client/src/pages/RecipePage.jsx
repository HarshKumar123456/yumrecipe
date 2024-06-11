import React from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";

const RecipePage = () => {
    const { recipeId } = useParams();

    const recipe = {
        id: "123",
        title: "Recipe",
        description: "Make your yum recipe",
        image: "https://picsum.photos/2000",
        steps: ["Sabse pahle paani lo", "Phir gas on karo", "Banao aur khao", "Phir bartan dhokar rakh do",],
    }

    return <>
        <Layout>
            <div className="recipe-container p-4 py-8 mb-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="recipe-image">
                    <img src={recipe.image} alt="recipe-image" className="rounded-md" />
                </div>
                <div className="recipe-details flex flex-col gap-y-8">
                    <div className="recipe-info">
                        <h2 className="text-4xl">
                            {recipe.title}
                        </h2>
                        <p>{recipe.description}</p>
                    </div>

                    <div className="recipe-steps flex flex-col gap-y-4">
                        {recipe && recipe.steps && recipe.steps.map((step,index) => (
                            <div key={index} className="recipe-step">
                                <h3 className="text-2xl">
                                    {`Step: ${index+1} `}
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