import ItemList from "./item-list";

export default function Page() {
    return (
        <main className="bg-gray-200">
            <div className="flex flex-col items-center justify-center m-8">
                <h1 className="p-6 m-4 bg-white rounded-2xl shadow-xs text-black font-bold">
                    Shopping List
                </h1>
                <ItemList />
            </div>
        </main>
    );
}