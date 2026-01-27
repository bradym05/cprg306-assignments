
const Item = ({ name, quantity, category } : { name:string, quantity:number, category:String}) => {
    return (
        <li>
            <h1 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
                {name}
            </h1>
            <p className="text-body">Quantity: {quantity}</p>
            <p className="text-body">Category: {category}</p>
        </li>
    )
}

export default Item