import React from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import RecipeCard from "../components/RecipeCard";

const SearchPage = () => {
    const {searchKeyword} = useParams();
    const recipes = [
        {
          id: "1",
          title: "One",
          description: "One desc",
          image: "https://picsum.photos/200",
          steps: ["Step 1", "Step 2"],
        },
        {
          id: "2",
          title: "Two",
          description: "Two desc",
          image: "https://picsum.photos/400",
          steps: ["Step 1", "Step 2"],
        },
        {
          id: "3",
          title: "Three",
          description: "Three desc",
          image: "https://picsum.photos/600",
          steps: ["Step 1", "Step 2"],
        },
        {
          id: "4",
          title: "Four",
          description: "Four desc",
          image: "https://picsum.photos/800",
          steps: ["Step 1", "Step 2"],
        },
      ]

    

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