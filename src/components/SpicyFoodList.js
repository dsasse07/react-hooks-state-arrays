import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    setFoods( foods => [...foods, newFood] )
  }

  function handleRemoveFood(id) {
    const newFoodArray = foods.map( (food) => {
      if (food.id === id) {
        return {...food, heatLevel: food.heatLevel + 1} 
      } else {
        return food
      }
    })
    setFoods(newFoodArray) 
  }
  
  const [filter, setFilter] = useState("All")

  function handleFilterChange(e) {
    setFilter(e.target.value)
  }
  
  const foodsToDisplay = foods.filter( food => {
    if (filter === "All") {
      return true
    } else {
      return food.cuisine === filter
    }
    }
  )

  const foodLis = foodsToDisplay.map( ({id, name, cuisine, heatLevel}) => {
    return <li key={id} onClick={ e => handleRemoveFood(id)}>Name: {name} | Cuisine: {cuisine} | Heat Level: {heatLevel} </li>
  }) 

  return (
    <div>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodLis}</ul>
    </div>
  );
}

export default SpicyFoodList;
