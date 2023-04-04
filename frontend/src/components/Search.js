import React, { useState } from 'react';
import './Search.css';

const data = [
  {
    "veg_name": "Roasted Broccoli",
    "time_to_make": "30 minutes",
    "ingredients": [
      "1 head broccoli, cut into florets",
      "2 tablespoons olive oil",
      "Salt and pepper to taste"
    ],
    "genre":"italian",
    "url": "https://www.foodnetwork.com/recipes/ina-garten/roasted-broccoli-recipe-1940599"
  },
  {
    "veg_name": "Garlic Mashed Potatoes",
    "time_to_make": "45 minutes",
    "ingredients": [
      "3 pounds Yukon Gold potatoes, peeled and cut into chunks",
      "6 cloves garlic, peeled",
      "1/2 cup unsalted butter, at room temperature",
      "1/2 cup milk, warmed",
      "Salt and pepper to taste"
    ],
    "genre":"italian",
    "url": "https://www.food.com/recipe/garlic-mashed-potatoes-124407"
  },
  {
    "veg_name": "Honey Glazed Carrots",
    "time_to_make": "25 minutes",
    "ingredients": [
      "1 pound carrots, peeled and sliced",
      "2 tablespoons unsalted butter",
      "2 tablespoons honey",
      "1/4 teaspoon ground ginger",
      "Salt and pepper to taste"
    ],
    "genre":"italian",
    "url": "https://www.delish.com/cooking/recipe-ideas/a27161686/honey-glazed-carrots-recipe/"
  },
  {
    "veg_name": "Roasted Brussels Sprouts",
    "time_to_make": "30 minutes",
    "ingredients": [
      "1 pound Brussels sprouts, trimmed and halved",
      "2 tablespoons olive oil",
      "Salt and pepper to taste"
    ],
    "genre":"italian",
    "url": "https://www.allrecipes.com/recipe/67952/roasted-brussels-sprouts/"
  },
  {
    "veg_name": "Sauteed Green Beans",
    "time_to_make": "20 minutes",
    "ingredients": [
      "1 pound green beans, trimmed",
      "2 tablespoons unsalted butter",
      "1 clove garlic, minced",
      "Salt and pepper to taste"
    ],
    "genre":"italian",
    "url": "https://www.foodnetwork.com/recipes/ina-garten/sauteed-green-beans-recipe-1917448"
  }
];

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('name');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const filteredData = data.filter((item) => {
    if (searchCategory === 'name') {
      return item.veg_name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchCategory === 'genre') {
      return item.genre.toString().includes(searchTerm);
    }
    else if(searchCategory === 'Time'){
        return item.time_to_make.toString().includes(searchTerm);
    }
  });

  return (
    <div>
      <div className='box_s'>
        <form name='Search'>
        <input type="text" id="searchTerm" value={searchTerm} onChange={handleSearchTermChange} />
        </form>
      </div>
      <div className='searchCat'>
        <label htmlFor="searchCategory"></label>
        <select id="searchCategory" value={searchCategory} onChange={handleSearchCategoryChange}>
          <option value="name">Name</option>
          <option value="genre">genre</option>
          <option value="Time">Time</option>

        </select>
      </div>
      {searchTerm !== '' && filteredData.length > 0 ? (
        <div className="card_search-container">
          {filteredData.map((item, index) => (
            <div className="card_search" key={index}>
              <a href={item.url}>
              <h2>{item.veg_name}</h2>
              <p>time: {item.time_to_make}</p>
              <p>ingredients: {item.ingredients}</p>
              </a>
            </div>
          ))}
        </div>
      ) : (
        searchTerm !== '' && <p>No results found.</p>
      )}
    </div>
  );
}

export default Search;
