"use client";

import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import Item from "../week-3/item";

const NewItem = () => {
    // Fields
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");

    // Validation states
    const [nameTouched, setNameTouched] = useState(false);

    // Category choices
    const categoryOptions: { label: string, value: string }[] = [
        { label: "Produce", value: "produce" },
        { label: "Dairy", value: "dairy" },
        { label: "Bakery", value: "bakery" },
        { label: "Meat", value: "meat" },
        { label: "Frozen Foods", value: "frozen" },
        { label: "Canned Goods", value: "canned" },
        { label: "Dry Goods", value: "dry goods" },
        { label: "Beverages", value: "beverages" },
        { label: "Snacks", value: "snacks" },
        { label: "Household", value: "household" },
        { label: "Other", value: "other" }
    ]

    // Callback on form submit
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        // Prevent default behavior
        e.preventDefault();
        // Validate fields
        if (!name || name.length < 2) {
            alert("Invalid name (cannot be < 2 characters)");
            return;
        }
        // Create item from current values
        let createdItem = Item({ name: name, category: category, quantity: quantity });
        console.log(createdItem);
        alert(`Name: ${name}\nQuantity: ${quantity}\nCategory ${category}`)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm ">
            {/* name */}
            <div className="p-4 m-4 bg-white rounded-2xl shadow-xs flex flex-col items-center text-center">
                <label htmlFor="name" className="text-black font-semibold p-2">Item Name</label>
                <input
                    id="name"
                    type="text"
                    className={
                        `w-full text-gray-800 text-center bg-gray-300 p-2 rounded-xl 
                        ${nameTouched && name == "" ? "border-red-500 border-2" : ""}`
                    }
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    required
                    onBlur={() => {setNameTouched(true)}}
                />
                {nameTouched && name == "" && (
                    <p className="w-full text-gray-800 text-center p-2 rounded-xl text-red-500">Name cannot be empty</p>
                )}
            </div>


            {/* quantity */}
            <div className="p-4 m-4 bg-white rounded-2xl shadow-xs flex flex-col items-center text-center">
                <label htmlFor="quantity" className="w-full text-black font-semibold p-2">Quantity</label>
                <input
                    id="quantity"
                    type="number"
                    className="w-full text-gray-800 text-center bg-gray-300 p-2 rounded-xl"
                    value={quantity}
                    min={1}
                    max={99}
                    onChange={({ target }) => setQuantity(parseInt(target.value))}
                    required
                />
            </div>

            {/* category */}
            <div className="p-4 m-4 bg-white rounded-2xl shadow-xs flex flex-col items-center text-center">
                <label htmlFor="category" className="w-full text-black font-semibold p-2">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={({ target }) => setCategory(target.value)}
                    className="w-full text-gray-800 text-center bg-gray-300 p-2 rounded-xl"
                >
                    {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* submit */}
            <div className="w-full flex flex-col items-center">
                <button
                    type="submit"
                    className={
                        `   p-3 m-4 bg-gray-300 rounded-2xl shadow-xs font-semibold 
                        ${name == "" ? "bg-gray-600 text-gray-500" : "bg-gray-300 hover:text-gray-800 hover:bg-white text-gray-600"}`
                    }
                    disabled={name==""}
                >
                    Submit
                </button>
            </div>

        </form>
    )
}

export default NewItem;