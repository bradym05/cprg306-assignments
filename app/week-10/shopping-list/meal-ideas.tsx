"use client";

import { useEffect, useState } from "react";

type MealIdeasProps = {
    ingredient: string;
};

type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
};

async function fetchMealIdeas(ingredient: string) {
    const trimmed = ingredient.trim();
    if (!trimmed) return [];

    const url = new URL("https://www.themealdb.com/api/json/v1/1/filter.php");
    url.search = new URLSearchParams({ i: trimmed }).toString();

    const response = await fetch(url);
    const data: { meals: Meal[] | null } = await response.json();
    return data.meals ?? [];
}

const MealIdeas = ({ ingredient }: MealIdeasProps) => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            try {
                const result = await fetchMealIdeas(ingredient);
                if (!cancelled) setMeals(result);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [ingredient]);

    const hasIngredient = ingredient.trim().length > 0;

    return (
        <section className="w-full max-w-3xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Meal ideas
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                            {hasIngredient ? (
                                <>
                                    Showing results for{" "}
                                    <span className="font-medium text-slate-900">
                                        {ingredient.trim()}
                                    </span>
                                </>
                            ) : (
                                "Select an item to see meal ideas."
                            )}
                        </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 border border-slate-200">
                        {loading ? "Loading…" : `${meals.length} found`}
                    </span>
                </header>

                <div className="p-4">
                    {!hasIngredient ? (
                        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
                            Pick an ingredient to search for meals.
                        </div>
                    ) : loading ? (
                        <div className="space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-16 rounded-xl border border-slate-200 bg-slate-50 animate-pulse"
                                />
                            ))}
                        </div>
                    ) : meals.length === 0 ? (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
                            <p className="text-sm font-medium text-slate-800">
                                No meals found
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                                Try a different ingredient.
                            </p>
                        </div>
                    ) : (
                        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {meals.map((meal) => (
                                <li
                                    key={meal.idMeal}
                                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
                                >
                                    {/* thumbnail */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={meal.strMealThumb}
                                        alt={meal.strMeal}
                                        className="h-14 w-14 rounded-xl object-cover border border-slate-200"
                                        loading="lazy"
                                    />

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-slate-900">
                                            {meal.strMeal}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-600">
                                            Click for details (optional)
                                        </p>
                                    </div>

                                    <div className="ml-auto text-slate-400 transition group-hover:text-slate-600">
                                        →
                                    </div>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MealIdeas;