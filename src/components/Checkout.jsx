

const Checkout = ({showCheckout, setShowCheckout, handleCheckout, customerInfo, setCustomerInfo, getTotal, Check}) => {
    return (<>
        {showCheckout && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.54)]" onClick={() => setShowCheckout(false)} />
                <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
                    <form onSubmit={handleCheckout} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                value={customerInfo.name}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                required
                                value={customerInfo.email}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="flex justify-between text-lg font-bold text-gray-800">
                                <span>Total Amount:</span>
                                <span className="text-purple-600">${getTotal().toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowCheckout(false)}
                                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2"
                            >
                                <Check size={20} />
                                Complete Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

    </>)
}

export default Checkout