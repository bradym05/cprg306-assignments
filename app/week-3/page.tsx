import ItemList from "./item-list";

export default function Page() {
    return (
        <main>
            <div className="flex flex-col items-center justify-center m-8">
                <h1 className="mb-2 text-lg font-medium text-heading">
                    Shopping List
                </h1>
                <ItemList />
            </div>
        </main>
    );
}