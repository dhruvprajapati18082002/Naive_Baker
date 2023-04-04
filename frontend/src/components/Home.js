import React from "react"
import RecipeItem from "./RecipeItem";

const Home = (props) => {
    return (
        <div>
            <div className="d-flex justify-content-around">
                <RecipeItem
                    image="https://cookingwithbry.com/wp-content/uploads/Paneer-Tikka-Masala-Recipe-1-735x735.jpg?_t=1678593746"
                    title="Paneer Tikka Masala" 
                    subtitle="Veg, 40-60 min"
                    text="Tikka Masala has such an interesting history. It’s a relatively new recipe truth be told, and dates back only to the 50’s or 60’s.    " 
                    recipeLink="/dashboard" 
                />
                <RecipeItem
                    image="https://www.manjulaskitchen.com/wp-content/uploads/punjabi_aloo_paratha.jpg"
                    title="Aloo Parathe" 
                    subtitle="Veg, 20-30 min"
                    text="A flavorful potato filling is by far the most popular. Aloo Parathas are very popular in North India, at any time of the day. In Punjab, Aloo Parathas are a staple for breakfast." 
                    recipeLink="/dashboard" 
                />
                <RecipeItem
                    image="https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/malai-kofta-2.jpg"
                    title="Malai Kofta" 
                    subtitle="Veg, 60-85 min "
                    text="Malai Kofta is a delicious dish of fried balls of potato and paneer in a rich and creamy mild gravy made with sweet onions and tomatoes." 
                    recipeLink="/dashboard" 
                />
                <RecipeItem
                    image="https://vismaifood.com/storage/app/uploads/public/914/f47/fa9/thumb__700_0_0_0_auto.jpg"
                    title="Chicken Biryani" 
                    subtitle="Non veg, 30-40 min"
                    text="Chettinad Chicken Biryani is synonymous with spicy Chicken Biryani!" 
                    recipeLink="/dashboard" 
                />
                <RecipeItem
                    image="https://www.whiskaffair.com/wp-content/uploads/2020/08/Shrikhand-2-3.jpg"
                    title="Shrikhand" 
                    subtitle="Veg, 30-40 min"
                    text="Shrikhand is a popular Indian dessert made using yogurt flavored with ground cardamom and sugar." 
                    recipeLink="/dashboard" 
                />
            </div>
        </div>
    );
}

export default Home;