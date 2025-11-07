import { ShoppingCart, Trash2, Plus, Minus, X } from 'lucide-react';


const CartSidebar = ({showCart, setShowCart , cart ,getTotal, setShowCheckout, updateQty, removeFromCart }) =>{

    return (<>
        {showCart && (
            <div className="fixed inset-0 z-50">
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.54)]" onClick={() => setShowCart(false)} />
                <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                            <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>

                        {cart.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4 mb-6">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                                            <div className="text-3xl">{item.image}</div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                                <p className="text-purple-600 font-bold">${item.price}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQty(item, -1)}
                                                    className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center font-semibold">{item.qty}</span>
                                                <button
                                                    onClick={() => updateQty(item, 1)}
                                                    className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4 mb-6">
                                    <div className="flex justify-between text-xl font-bold text-gray-800">
                                        <span>Total:</span>
                                        <span className="text-purple-600">${getTotal().toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowCart(false);
                                        setShowCheckout(true);
                                    }}
                                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                                >
                                    Proceed to Checkout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )}
    </>)
}

export default CartSidebar;