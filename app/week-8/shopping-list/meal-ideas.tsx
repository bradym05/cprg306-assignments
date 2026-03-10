"use client";

import { useState, useEffect } from "react";
import { ShoppingItem } from "./types";
import { ClientRequest, request } from "http";

type MealIdeasProps = {
    ingredient: string
}


type Meal = {
    idMeal: string,
    strMeal: string,
    strMealThumb: string
}

async function fetchMealIdeas(ingredient: string) {
    if (ingredient.length > 0) {
        const fetchURL = new URL("https://www.themealdb.com/api/json/v1/1/filter.php")
        const params = new URLSearchParams()
        params.append("i", ingredient)
        fetchURL.search = params.toString()
        console.log(params.toString())
        const response = await fetch(fetchURL)
        const data: { meals: Meal[] } = await response.json()
        return data["meals"]
    } else {
        return []
    }
}

const MealIdeas = ({ ingredient }: MealIdeasProps) => {

    const [meals, setMeals] = useState<Meal[]>([]);

    async function loadMealIdeas() {
        let meals = await fetchMealIdeas(ingredient)
        if (meals) {
            setMeals(meals)

        } else {
            setMeals([])
        }
    }

    // Call on load and on ingredient changed
    useEffect(() => {
        loadMealIdeas()
    }, [ingredient])

    return (
        <div
            className="bg-gray-300 rounded-2xl shadow-xs m-5 p-4 w-full"
        >
            <div className="w-full flex flex-row items-center">
                <ol className="w-full">
                    {meals.length > 0 && meals.map((meal: Meal, i) => (
                        <li key={i} className="p-4 m-4 bg-white rounded-2xl shadow-xs text-black font-semibold">
                            <p className="text-gray-700">
                                {meal.strMeal}
                            </p>
                        </li>
                    )) ||
                        <li className="p-4 m-4  rounded-2xl text-center text-black font-semibold">
                            <p className="text-gray-700">
                                No meals found
                            </p>
                        </li>
                    }
                </ol>
            </div>

        </div>
    );
}

export default MealIdeas;