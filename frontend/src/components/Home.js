import React from "react";
import RecipeItem from "./RecipeItem";
import "./font.css";
import "./fonts/GreatVibes-Regular.ttf";
import "./fonts/AutumnFlowers-9YVZK.otf";
// import "./fonts/SweetHipster-PzlE.tff";
import "./fonts/WeddingdayPersonalUseRegular-1Gvo0.ttf";
import "./fonts/AngelicaPersonalUseItalic-MVmZB.ttf";
import "./fonts/BunchBlossomsPersonalUse-0nA4.ttf";
const Home = (props) => {
  return (
    <div className="container-fluid" style={{ backgroundColor: "#8fc4b7" }}>
      <div
        className="row bg-image"
        style={{
          backgroundImage:
            "url(https://thumbs.dreamstime.com/b/baking-cooking-wood-background-various-ingredients-utensils-warm-61441357.jpg)",
          
          height: "100vh",
          
        }}
      >
        <div style={{ width: "50em" }}>
          <p
            style={{
              fontSize: 86,
              color: "white",
              fontWeight: "bold",
              fontFamily: "BunchBlossomsPersonalUse-0nA4",
            }}
          >
            {" "}
            <center>
              {" "}
              <br />
              WELCOME <br />
              TO <br />
              NAIVE BAKER{" "}
            </center>
          </p>
        </div>
        <div></div>
        <div></div>
      </div>

      <div>
        <br />
        <h3>
          <center> TOP RECIPES</center>
        </h3>

        <div className="d-flex flex-wrap justify-content-around">
          <RecipeItem
            image="https://cookingwithbry.com/wp-content/uploads/Paneer-Tikka-Masala-Recipe-1-735x735.jpg?_t=1678593746"
            title="Paneer Tikka Masala"
            subtitle="Veg, 40-60 min"
            text="Tikka Masala has such an interesting history. It’s a relatively new recipe truth be told, and dates back only to the 50’s or 60’s.    "
            recipeLink="/search"
          />
          <RecipeItem
            image="https://www.manjulaskitchen.com/wp-content/uploads/punjabi_aloo_paratha.jpg"
            title="Aloo Parathe"
            subtitle="Veg, 20-30 min"
            text="A flavorful potato filling is by far the most popular. Aloo Parathas are very popular in North India, at any time of the day. In Punjab, Aloo Parathas are a staple for breakfast."
            recipeLink="/search"
          />
          <RecipeItem
            image="https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/malai-kofta-2.jpg"
            title="Malai Kofta"
            subtitle="Veg, 60-85 min "
            text="Malai Kofta is a delicious dish of fried balls of potato and paneer in a rich and creamy mild gravy made with sweet onions and tomatoes."
            recipeLink="/search"
          />
          <RecipeItem
            image="https://vismaifood.com/storage/app/uploads/public/914/f47/fa9/thumb__700_0_0_0_auto.jpg"
            title="Chicken Biryani"
            subtitle="Non veg, 30-40 min"
            text="Chettinad Chicken Biryani is synonymous with spicy Chicken Biryani!"
            recipeLink="/search"
          />
          <RecipeItem
            image="https://www.whiskaffair.com/wp-content/uploads/2020/08/Shrikhand-2-3.jpg"
            title="Shrikhand"
            subtitle="Veg, 30-40 min"
            text="Shrikhand is a popular Indian dessert made using yogurt flavored with ground cardamom and sugar."
            recipeLink="/search"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
