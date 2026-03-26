"use client";

import { useState } from "react";
import Item from "./item";
import { ShoppingItem } from "./types";

type ItemListProps = {
    items: ShoppingItem[];
    onItemSelect: (item: ShoppingItem) => void;
};

type SortOption = "name" | "category" | null;

const ItemList = ({ items, onItemSelect }: ItemListProps) => {
    const [sortBy, setSortBy] = useState<SortOption>("name");

    function getSortedItems() {
        return [...items].sort((a, b) => {
            if (sortBy == null) return 0;
            return String(a[sortBy]).localeCompare(String(b[sortBy]));
        });
    }

    // Group items by category (used when sortBy === null)
    const categoryRecord = items.reduce((acc, item) => {
        (acc[item.category] ??= []).push(item);
        return acc;
    }, {} as Record<string, ShoppingItem[]>);

    const categoryKeys = Object.keys(categoryRecord).sort();

    const pillBase =
        "px-4 py-2 rounded-lg text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400";
    const pillActive = "bg-slate-900 text-white shadow-sm";
    const pillInactive = "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200";

    return (
        <section className="w-full max-w-3xl mx-auto">
            {/* Sort controls */}
            <div className="mb-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Items</h2>

                    <div className="inline-flex w-full sm:w-auto rounded-xl bg-slate-100 p-1 border border-slate-200">
                        {(["name", "category"] as Exclude<SortOption, null>[]).map((key) => (
                            <button
                                key={key}
                                onClick={() => setSortBy(key)}
                                className={[
                                    "flex-1 sm:flex-none",
                                    pillBase,
                                    sortBy === key ? pillActive : pillInactive,
                                ].join(" ")}
                            >
                                Sort: {key[0].toUpperCase() + key.slice(1)}
                            </button>
                        ))}

                        <button
                            onClick={() => setSortBy(null)}
                            className={[
                                "flex-1 sm:flex-none",
                                pillBase,
                                sortBy === null ? pillActive : pillInactive,
                            ].join(" ")}
                        >
                            Group by Category
                        </button>
                    </div>
                </div>
            </div>

            {/* Items */}
            {sortBy !== null ? (
                <ol className="space-y-3">
                    {getSortedItems().map((itemProps, i) => (
                        <li key={`${itemProps.name}-${itemProps.category}-${i}`}>
                            <Item {...itemProps} onSelect={() => onItemSelect(itemProps)} />
                        </li>
                    ))}
                </ol>
            ) : (
                <div className="space-y-6">
                    {categoryKeys.map((category) => (
                        <section
                            key={category}
                            className="rounded-2xl border border-slate-200 bg-white shadow-sm"
                        >
                            <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                                <h3 className="text-base font-semibold text-slate-900">
                                    {category}
                                </h3>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                    {categoryRecord[category].length} item
                                    {categoryRecord[category].length === 1 ? "" : "s"}
                                </span>
                            </header>

                            <ol className="p-4 space-y-3">
                                {categoryRecord[category]
                                    .slice()
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((itemProps, i) => (
                                        <li key={`${itemProps.name}-${itemProps.category}-${i}`}>
                                            <Item {...itemProps} onSelect={() => onItemSelect(itemProps)} />
                                        </li>
                                    ))}
                            </ol>
                        </section>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ItemList;
