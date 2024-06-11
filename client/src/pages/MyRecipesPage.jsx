import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

const MyRecipesPage = () => {
    const [auth, setAuth] = useAuth();

    const [recipes, setRecipes] = useState([
        {
            id: "1",
            title: "One",
            description: "One desc",
            ingredients: "Aloo,baigan",
            image: "https://picsum.photos/200",
            steps: ["Step 1", "Step 2"],
        },
        {
            id: "2",
            title: "Two",
            description: "Two desc",
            ingredients: "Aloo,baigan",
            image: "https://picsum.photos/400",
            steps: ["Step 1", "Step 2"],
        },
        {
            id: "3",
            title: "Three",
            description: "Three desc",
            ingredients: "Aloo,baigan",
            image: "https://picsum.photos/600",
            steps: ["Step 1", "Step 2"],
        },
        {
            id: "4",
            title: "Four",
            description: "Four desc",
            ingredients: "Aloo,baigan",
            image: "https://picsum.photos/800",
            steps: ["Step 1", "Step 2"],
        },
    ]);

    const serverURI = import.meta.env.VITE_SERVER_URI;

    const getRecipes = async () => {
        if(!(auth.user)){
            return ;
        }
        try {
            const response = await axios.post(`${serverURI}/api/v1/recipe/get-recipe-by-author`,
                {
                    author: auth.user.email,
                });
            if (response.data.success) {
                toast.success("Let the world taste some more from your recipes....");
                if (response.data.recipes.length === 0) {
                    toast.error("Oops these recipes are not available....");
                    setRecipes((await axios.get(`${serverURI}/api/v1/recipe/get-recipe-by-keyword/yummy`)).data.recipes);
                }

                setRecipes(response.data.recipes);
            }
            else {
                toast.error("Search error....")
                toast.error(`${response.data.message}`);
                setTimeout(() => {
                    navigate(`/my-recipes`);
                }, 2000);
            }

        } catch (error) {
            console.error(error);
            toast.error("Search error....")
            toast.error(`${error.message}`);
            setTimeout(() => {
                navigate(`/my-recipes`);
            }, 2000);
        }
    };

    useEffect(() => {
        getRecipes();
    }, []);

    return <>
        <Layout>
            <div className="min-h-80 max-h-fit p-8">
                <div className="hero-text-container py-8">
                    <h2 className="text-4xl font-bold">
                        Got some new recipe it's time to upload now 👨‍🍳....
                    </h2>
                    Let the world feel the magic of your cooking...
                </div>
                <Link to={"/recipe/1/create"} className="px-4 py-2 rounded-md bg-green-500 text-white font-bold">
                    Upload
                </Link>

                {recipes && recipes.length ?
                    (
                        <div className="mt-8 mb-32 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {recipes && recipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    id={recipe.id}
                                    title={recipe.title}
                                    description={recipe.description}
                                    image={recipe.image}
                                    actions={"edit"}
                                />
                            ))}
                        </div>
                    ) :
                    (
                        <div className="mt-16 h-screen">
                            <h3 className="text-2xl">
                                Can't wait to taste the magic of your cooking 👨‍🍳
                            </h3>
                            <p className="text-gray-500">
                                Upload your recipes now....
                            </p>
                        </div>
                    )
                }

            </div>
        </Layout>
    </>;
};

export default MyRecipesPage;