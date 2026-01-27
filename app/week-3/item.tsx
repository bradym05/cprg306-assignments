
const Item = ({ name, quantity, category } : { name:string, quantity:number, category:String}) => {
    return (
        <li className="p-4 m-4 bg-white rounded-2xl shadow-xs text-black font-semibold">
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