"use client";

const Item = ({ name, quantity, category, onSelect } : { name:string, quantity:number, category:String, onSelect:()=>void}) => {
    return (
        <li className="cursor-pointer p-4 m-4 bg-white rounded-2xl shadow-xs text-black font-semibold hover:bg-gray-100" onClick={onSelect}>
            <p className="text-gray-700">
                {name}
            </p>
            <ul className="text-gray-500 ps-5 mt-2 space-y-1 list-disc list-inside">
                <li>Quantity: {quantity}</li>
                <li>Category: {category}</li>
            </ul>
        </li>
    )
}

export default Item