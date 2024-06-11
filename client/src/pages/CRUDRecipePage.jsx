import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

const CRUDRecipePage = () => {
    const { recipeId, actions } = useParams();
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        id: "1",
        title: "",
        description: "",
        ingredients: "",
        image: "",
        steps: [],
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
        if (actions === "edit" || actions === "delete") {
            getRecipes();
        }
    }, []);

    const handleChange = (e) => {
        setRecipe((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleStepChange = (e) => {
        setRecipe((prevRecipe) => {
            const updatedSteps = prevRecipe.steps.map((step, i) => (i === Number(e.target.name) ? e.target.value : step));
            return {
                ...prevRecipe,
                steps: updatedSteps,
            };
        })
    }

    const handleStepMinusButtonClick = (stepIndex) => {
        setRecipe((prevRecipe) => {
            prevRecipe.steps.splice(stepIndex,1);
            const updatedSteps = prevRecipe.steps;
            console.log("Updated steps");
            console.log(updatedSteps);
            return {
                ...prevRecipe,
                steps: updatedSteps,
            };
        })

    }

    const handleStepPlusButtonClick = () => {
        setRecipe((prevRecipe) => {
            return {
                ...prevRecipe,
                steps: [...prevRecipe.steps, ""],
            };
        });
    };


    const handleDeleteButtonClick = async (e) => {
        e.preventDefault();
        console.log("Ab Delete ki baari");
        console.log(recipe);

        if (!(auth.user)) {
            toast.error("Oops! You should be logged in to upload/delete your recipes....")
            return;
        }
        else if (recipe.id === "") {
            toast.error("Oops! There is no recipe to delete....")
            return;
        }
        else if(recipe.author !== auth.user.email){
            toast.error("You can't update others recipe....")
            return ;
        }

        try {
            const response = await axios.put(`${serverURI}/api/v1/recipe/delete-recipe`, {
                ...recipe,
                author: auth.user.email,
            });
            if (response.data.success) {
                toast.success("Deleted Successfully...")
                setTimeout(() => {
                    navigate(`/my-recipes`);
                }, 2000);
            }
            else {
                toast.error("Error while Deleting...")
                toast.error(`${response.data.message}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Recipe not found....")
            toast.error(`${error.message}`);
            setTimeout(() => {
                navigate(`/recipe/${recipeId}`);
            }, 2000);
        }

    }

    const handleSaveButtonClick = async (e) => {
        e.preventDefault();
        console.log("Ab submit ki baari");
        console.log(recipe);

        console.log(auth);


        if (!(auth.user)) {
            toast.error("Oops! You should be logged in to upload/delete your recipes....")
            return;
        }
        else if (recipe.id === "") {
            toast.error("Oops! There is no recipe to save....")
            return;
        }
        else if (recipe.title === "" || recipe.description === "" || recipe.image === "" || recipe.ingredients === "" || recipe.steps.length === 0) {
            toast.error("Please enter title, description, image, ingredients and steps of recipe....")
            return;
        }
        else if(actions === "edit" && recipe.author !== auth.user.email){
            toast.error("You can't update others recipe....")
            return ;
        }

        if (actions === "edit") {
            try {
                const response = await axios.put(`${serverURI}/api/v1/recipe/update-recipe`, {
                    ...recipe,
                    author: auth.user.email,
                })
                if (response.data.success) {
                    toast.success("Updated Successfully...")
                }
                else {
                    toast.error("Error while updating...")
                    toast.error(`${response.data.message}`);
                }
            } catch (error) {
                console.log(recipe);
                console.error(error);
                toast.error("Recipe not found....")
                toast.error(`${error.message}`);
                setTimeout(() => {
                    navigate(`/recipe/${recipeId}`);
                }, 2000);
            }
        }
        else if (actions === "create") {
            console.log("Create clicked...");
            try {
                const response = await axios.post(`${serverURI}/api/v1/recipe/create-recipe`, {
                    ...recipe,
                    author: auth.user.email,
                });
                if (response.data.success) {
                    toast.success("Created Successfully...")
                    setTimeout(() => {
                        navigate(`/my-recipes`);
                    }, 2000);
                }
                else {
                    toast.error("Error while Creating...")
                    toast.error(`${response.data.message}`);
                }
            } catch (error) {
                console.error(error);
                toast.error("Recipe not found....")
                toast.error(`${error.message}`);
                setTimeout(() => {
                    navigate(`/recipe/${recipeId}`);
                }, 2000);
            }
        }
        else {
            toast.error("Oops Something went wrong....")
        }
    }


    return <>
        <Layout>
            <form className="recipe-container p-4 py-8 mb-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="recipe-image flex justify-center">
                    <img src={`${recipe ? recipe.image : ""}`} alt="recipe-image" className="rounded-md max-h-96" />
                </div>
                <div className="recipe-details flex flex-col gap-y-8">

                    <div className="recipe-info flex flex-col gap-y-2">
                        <h2 className="text-4xl pb-4">Details</h2>
                        <input className="py-2 px-4 bg-[#F0EFFF] rounded text-4xl outline-none" type="text" name="title" id="title" value={recipe.title} onChange={handleChange} placeholder="Paneer Tikka, Matar Paneer etc." />
                        <input className="py-2 px-4 bg-[#F0EFFF] rounded outline-none" type="text" name="image" id="image" value={recipe.image} onChange={handleChange} placeholder="Enter URL of image like: https://picsum.photos/400" />
                        <textarea className="py-2 px-4 bg-[#F0EFFF] outline-none rounded scroll-none" rows={4} type="text" name="description" id="description" value={recipe.description} onChange={handleChange} placeholder="Describe your Recipe: Taste the spicy and delicious Paneer Tikka... ">
                        </textarea>
                        <textarea className="py-2 px-4 bg-[#F0EFFF] outline-none rounded scroll-none" rows={4} type="text" name="ingredients" id="ingredients" value={recipe.ingredients} onChange={handleChange} placeholder="Ingredients: Aloo, Mirchi, Paani etc. ">
                        </textarea>
                        <hr />
                    </div>
                    <div className="recipe-steps flex flex-col gap-y-4">
                        <h2 className="text-4xl pb-4">Steps</h2>
                        {recipe && recipe.steps && recipe.steps.map((step, index) => (
                            <div key={index} className="recipe-step">
                                <div className="step-info-container flex justify-between">
                                    <h3 className="text-2xl">
                                        {`Step: ${index + 1} `}
                                    </h3>
                                    <p className="cursor-pointer px-4 py-2 text-4xl text-red-500" onClick={() => {
                                        handleStepMinusButtonClick(index)
                                    }}>
                                        -
                                    </p>
                                </div>
                                <textarea className="py-2 px-4 w-full bg-[#F0EFFF] outline-none rounded scroll-none" rows={2} type="text" name={`${index}`} id={`${index}`} value={recipe.steps[index]} onChange={handleStepChange}>
                                </textarea>
                            </div>
                        ))}

                        <p className="cursor-pointer px-4 flex gap-4 justify-center items-center border border-violet-500 rounded-full text-4xl font-bold text-violet-500" onClick={handleStepPlusButtonClick}>
                            +
                        </p>

                        <div className="actions-button-container grid grid-cols-2 gap-8">
                            <button type="submit" className="mt-4 py-2 px-4 hover:bg-red-400 active:bg-red-600 bg-red-500 rounded-full text-4xl text-white" onClick={handleDeleteButtonClick}>Delete</button>

                            <button type="submit" className="mt-4 py-2 px-4 hover:bg-green-400 active:bg-green-600 bg-green-500 rounded-full text-4xl text-white" onClick={handleSaveButtonClick}>Save</button>
                        </div>
                    </div>
                </div>
            </form>

        </Layout>
    </>;
};

export default CRUDRecipePage;