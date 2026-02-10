"use client";

import { useEffect, useState } from "react";

import Item from "./item";
import items from "./items.json";

const ItemList = () => {

    // Custom sort by type
    type sortOptions = "name" | "category" | null

    // States
    const [sortBy, setSortBy] = useState<sortOptions>("name");

    // Sort items based on sortBy state
    function sortItems() {
        items.sort((a, b) => {
            if (sortBy != null) {
                return a[sortBy].toLocaleString().localeCompare(b[sortBy].toLocaleString());

            } else {
                return 0;
            }
        });
    }

    // Category to items in category
    let categoryRecord = items.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = []
        }
        acc[item.category].push(item)
        return acc;
    }, {} as Record<string, typeof Item.prototype>)
    let categoryKeys = Object.keys(categoryRecord).sort()
    categoryKeys.forEach((key) => {
        categoryRecord[key] = categoryRecord[key].sort()
    })
    // Sort on sortBy state changed
    useEffect(sortItems, [sortBy])

    // Sort initially
    sortItems()

    return (
        <div>
            {/* sort by */}
            <div className="w-full flex flex-col md:flex-row items-center ">
                {["name" as sortOptions, "category" as sortOptions,].map((sortKey) => sortKey != null && (
                    <button
                        key={sortKey}
                        onClick={() => setSortBy(sortKey)}
                        className={[
                            `p-3 h-20 w-50 m-4 rounded-2xl shadow-xs font-semibold hover:text-gray-800 hover:bg-white text-gray-600`,
                            sortBy == sortKey ? "bg-white" : "bg-gray-300"
                        ].join(" ")}
                    >
                        {sortKey[0].toUpperCase() + sortKey.slice(1)}
                    </button>
                ))}
                {/* Group by category */}
                <button
                    onClick={() => setSortBy(null)}
                    className={[
                        `p-3 h-20    w-50 m-4 rounded-2xl shadow-xs font-semibold hover:text-gray-800 hover:bg-white text-gray-600`,
                        sortBy == null ? "bg-white" : "bg-gray-300"
                    ].join(" ")}
                >
                    Group by Category
                </button>
            </div>

            {/* items */}
            <div className="w-full flex flex-col items-center"> 
                <ol className="w-full max-w-sm">
                    {sortBy != null && items.map((itemProps) => (
                        <Item key={itemProps.id} {...itemProps} />
                    ))}
                    {sortBy == null && categoryKeys.map((category, i) => (
                        <div
                            key={category}
                            className="bg-gray-300 rounded-2xl shadow-xs m-5 p-4"
                        >
                            <h2 className="p-6 m-4 bg-white rounded-2xl shadow-xs text-black font-bold">
                                {category}
                            </h2>
                            <div className="w-full flex flex-row items-center">
                                <ol className="w-full max-w-sm">
                                    {categoryRecord[category].map((itemProps: typeof Item.prototype) => (
                                        <Item key={itemProps.id} {...itemProps} />
                                    ))}
                                </ol>
                            </div>

                        </div>
                    ))}
                </ol>

            </div>
        </div >

    )
}

export default ItemList