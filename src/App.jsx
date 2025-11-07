import React, { useState, useEffect } from 'react';
import {  Check } from 'lucide-react';
import Header from './components/Header';
import ProductsGrid from './components/ProductsGrid';
import CartSliderbar from './components/CartSidebar'
import Checkout from './components/Checkout';
import Receipt from './components/Receipt.jsx';



function App() {

    /**
     *
     * @typedef Product
     * @property {string} _id - mongoDB id
     * @property {number} id - product id
     * @property {string} name - product name
     * @property {number} price - product price
     * @property {string} image - product img
     * */

    /**
     * Store all products
     * @type {Product[]} products
     */
    const [products, setProducts] = useState([]);

    /**
     * Store cart items
     * @type {Product[]} cart
     */
    const [cart, setCart] = useState([]);

    const [showCart, setShowCart] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);

    /**
     * @typedef Customer
     * @property {string} name - Customer full name
     * @property {string} email - Customer email address
     */

    /**
     * @typedef Item
     * @property {string} _id - MongoDB item ID
     * @property {number} id - Product ID
     * @property {string} name - Product name
     * @property {number} price - Product price
     * @property {string} image - Product image
     * @property {number} qty - Quantity ordered
     */

    /**
     * @typedef Order
     * @property {string} orderId - order ID
     * @property {number} total - Total order amount
     * @property {string} timestamp - time
     * @property {Customer} customer - Customer details
     * @property {Item[]} items - List of items in the order
     */

    /**
     * store order receipt
     * @type {Order}
     */
    const [receipt, setReceipt] = useState(null);


    const [customerInfo, setCustomerInfo] = useState({ name: '', email: '' });

    useEffect(() => {
        loadProducts();
    }, []);



    const loadProducts = async () => {
        try {
            const response = await fetch(`/api/products`);
            const data = await response.json();
            setProducts(data);


                const res = await fetch('/api/cart',{
                    method: 'GET',
                });
                const cartData = await res.json();
                console.log("cart data",cartData);
                setCart([...cartData.items])
                // console.log("get total  ",cartData);



        } catch (error) {
            console.error('Error loading products:', error);
        }


    };

    const addToCart = async (product) => {

        try {
            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                // await api.addToCart(product.id, 1);
                await fetch('/api/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId: product._id, qty: 1 })
                });
                setCart(cart.map(item =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                ));
            } else {
                // await api.addToCart(product.id, 1);
                await fetch('/api/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId: product._id, qty: 1 })
                });
                setCart([...cart, { ...product, qty: 1 }]);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };



    const updateQty = async (product, qty) => {

        const item = cart.find(i => i.id === product.id);
        const newQty = item.qty + qty;

        if (newQty <= 0) {
            removeFromCart(product);
        } else {
            // await api.addToCart(productId, qty);

            await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId : product._id, qty: qty })
            });
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, qty: newQty }
                    : item
            ));
        }
    };


    const removeFromCart = async (product) => {

        try {
            // await api.removeFromCart(product);
            await fetch(`/api/cart/${product._id}`, {
                method: 'DELETE',
            })
            setCart(cart.filter(item => item.id !== product.id));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };


    const getTotal = () => {

        return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    };



    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItems: cart, customerInfo })
            });
            const result = await response.json();

            setReceipt(result);
            setShowReceipt(true);
            setShowCheckout(false);
            setCart([]);
            setCustomerInfo({ name: '', email: '' });
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            {/* Header */}
            <Header setShowCart={setShowCart} cart={cart} />


            {/* Products Grid */}
            <ProductsGrid products={products}  addToCart={addToCart}/>

            {/* Cart Sidebar */}
            <CartSliderbar showCart={showCart} setShowCart={setShowCart} cart={cart} getTotal={getTotal} setShowCheckout={setShowCheckout} updateQty={updateQty} removeFromCart={removeFromCart} />

            {/* Checkout Modal */}
            <Checkout showCheckout={showCheckout} setShowCheckout={setShowCheckout} handleCheckout={handleCheckout} customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} getTotal={getTotal} Check={Check} />

            {/* Receipt Modal */}
            <Receipt showReceipt={showReceipt} receipt={receipt} setShowReceipt={setShowReceipt} Check={Check} />

        </div>
    );
}

export default App;