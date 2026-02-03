import NewItem from "./new-item"

export default function Page() {
    return (
        <main className="bg-gray-200">
            <div className="flex flex-col items-center justify-center m-8 h-[100vh]">
                <NewItem />

            </div>
        </main>

    )
}