"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json"
import { useState } from "react";
import { ShoppingItem } from "./types";

export default function Page() {

    const [items, setItems] = useState<ShoppingItem[]>(itemsData)

    function handleAddItem(item: ShoppingItem) {
        setItems([...items, item])
    }
    return (
        <main className="bg-gray-200">
            <div className="flex flex-col items-center justify-center m-8">
                <h1 className="p-6 m-4 bg-white rounded-2xl shadow-xs text-black font-bold">
                    Shopping List
                </h1>
                <NewItem onAddItem={handleAddItem}/>
                <ItemList items={items}/>
            </div>
        </main>
    );
}