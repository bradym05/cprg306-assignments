"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json"
import { useState } from "react";
import { ShoppingItem } from "./types";
import MealIdeas from "./meal-ideas";

export default function Page() {

    const [items, setItems] = useState<ShoppingItem[]>(itemsData)
    const [selectedItemName, setSelectedItemName] = useState("")

    function handleAddItem(item: ShoppingItem) {
        setItems([...items, item])
    }

    function handleItemSelect(item: ShoppingItem) {
        let cleanedName = item.name.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|�[�-�]|�[�-�]|[\u2011-\u26FF]|�[�-�])/g, '')
        cleanedName = cleanedName.split(",")[0];
        cleanedName = cleanedName.replace(/[^\w\s]/gi, '')
        cleanedName = cleanedName.trim()
        if (cleanedName.charAt(cleanedName.length-1) =="s") {
            cleanedName = cleanedName.slice(0, cleanedName.length-1)
        }
        setSelectedItemName(cleanedName.trim())
    }
    return (
        <main className="bg-gray-200">
            <div className="flex flex-row items-start justify-center">
                <div className="flex flex-col items-center justify-center m-8">
                    <h1 className="p-6 m-4 bg-white rounded-2xl shadow-xs text-black font-bold">
                        Shopping List
                    </h1>
                    <NewItem onAddItem={handleAddItem} />
                    <ItemList items={items} onItemSelect={handleItemSelect} />
                </div>

                <div className="flex flex-1 flex-col items-center justify-center m-8">
                    <h1 className="p-6 m-4 bg-white rounded-2xl shadow-xs text-black font-bold">
                        Meals
                    </h1>
                    <MealIdeas ingredient={selectedItemName}/>
                </div>
            </div>

        </main>
    );
}