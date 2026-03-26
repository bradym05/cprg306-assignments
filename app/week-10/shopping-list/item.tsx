"use client";

type ItemProps = {
    name: string;
    quantity: number;
    category: string;
    onSelect: () => void;
};

const Item = ({ name, quantity, category, onSelect }: ItemProps) => {
    return (
        <article
            onClick={onSelect}
            className={[
                "cursor-pointer select-none",
                "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
                "transition hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300",
                "focus-within:ring-2 focus-within:ring-indigo-500/30",
            ].join(" ")}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-slate-900">
                        {name}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                        Qty <span className="font-medium text-slate-800">{quantity}</span>
                    </p>
                </div>

                <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 border border-slate-200">
                    {category}
                </span>
            </div>
        </article>
    );
};

export default Item;
