import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ id, title, description, image, actions }) => {
    const recipe = {
        id: id || "123",
        title: title || "Recipe",
        description: description || "Make your yum recipe",
        image: image || "https://picsum.photos/2000",
    }

    return <>
        <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={recipe.image}
                    alt="recipe-image"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-lg text-gray-700 font-bold">
                        <Link to={`/recipe/${recipe.id}${actions ? "/" + actions : ""}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {recipe.title.slice(0,24)}{`${recipe.title.length > 24 ? "...." : ""}`}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {recipe.description.slice(0,40)}....
                    </p>
                </div>
                <p className="ms-4 px-4 py-2 text-nowrap bg-violet-200 h-fit rounded-full text-sm font-medium text-gray-900">
                    See Recipe
                </p>
            </div>
        </div>
    </>;
}

export default RecipeCard;