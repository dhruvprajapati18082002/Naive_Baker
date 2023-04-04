import React from "react"
import RecipeItem from "./RecipeItem";

const Home = (props) => {
    return (
        <div>
            <div className="d-flex">
                <RecipeItem
                    image="https://i.imgur.com/ZTkt4I5.jpg"
                    title="recipe title" 
                    subtitle="subtitle"
                    text="something here...." 
                    recipeLink="/dashboard" 
                />
                <RecipeItem
                    image="https://i.imgur.com/ZTkt4I5.jpg"
                    title="recipe title" 
                    subtitle="subtitle"
                    text="something here...." 
                    recipeLink="/dashboard" 
                />
                <RecipeItem
                    image="https://i.imgur.com/ZTkt4I5.jpg"
                    title="recipe title" 
                    subtitle="subtitle"
                    text="something here...." 
                    recipeLink="/dashboard" 
                />
                <RecipeItem
                    image="https://i.imgur.com/ZTkt4I5.jpg"
                    title="recipe title" 
                    subtitle="subtitle"
                    text="something here...." 
                    recipeLink="/dashboard" 
                />
                <RecipeItem
                    image="https://i.imgur.com/ZTkt4I5.jpg"
                    title="recipe title" 
                    subtitle="subtitle"
                    text="something here...." 
                    recipeLink="/dashboard" 
                />
            </div>
        </div>
    );
}

export default Home;