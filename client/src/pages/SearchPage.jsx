import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import RecipeCard from "../components/RecipeCard";

import axios from "axios";
import toast from "react-hot-toast";

const SearchPage = () => {
  const { searchKeyword } = useParams();
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
      ingredients: "Aloo,baigan",
      description: "Three desc",
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
    try {
      const response = await axios.get(`${serverURI}/api/v1/recipe/get-recipe-by-keyword/${searchKeyword}`);
      if (response.data.success) {
        toast.success("Searched Successfully....");
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
          navigate(`/search/${searchKeyword}`);
        }, 2000);
      }

    } catch (error) {
      console.error(error);
      toast.error("Search error....")
      toast.error(`${error.message}`);
      setTimeout(() => {
        navigate(`/search/${searchKeyword}`);
      }, 2000);
    }
  };

  useEffect(() => {
    getRecipes();
  }, [searchKeyword]);

  return <>
    <Layout>
      <div className="min-h-80 max-h-fit p-8">
        <div className="hero-text-container py-8">
          <h2 className="text-4xl font-bold">
            Search results for "{searchKeyword}"....
          </h2>
        </div>


        <div className="mt-8 mb-32 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {recipes && recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
            />
          ))}
        </div>
      </div>
    </Layout>
  </>;
}

export default SearchPage;