import React from "react";
import { ShoppingCart } from 'lucide-react';
const Header = ({setShowCart, cart })=>{
    return (
        <header className="bg-white shadow-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-purple-600">Vibe Commerce</h1>
                <button
                    onClick={() => setShowCart(true)}
                    className="relative bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
                >
                    <ShoppingCart size={20} />
                    Cart
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
                    )}
                </button>
            </div>
        </header>
    )
}

export default Header;