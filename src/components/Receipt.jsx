

const Receipt = ({showReceipt, receipt, setShowReceipt, Check}) => {
    return (<>
        {showReceipt && receipt && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.54)]" onClick={() => setShowReceipt(false)} />
                <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check size={32} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Order Confirmed!</h2>
                        <p className="text-gray-600 mt-2">Thank you for your purchase</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Order ID:</span>
                            <span className="font-semibold text-gray-800">{receipt.orderId}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Customer:</span>
                            <span className="font-semibold text-gray-800">{receipt.customer.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-semibold text-gray-800">{receipt.customer.email}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-semibold text-gray-800">
                  {new Date(receipt.timestamp).toLocaleDateString()}
                </span>
                        </div>
                    </div>

                    <div className="border-t pt-4 mb-6">
                        <h3 className="font-semibold text-gray-800 mb-3">Order Items:</h3>
                        {receipt.items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">{item.name} x{item.qty}</span>
                                <span className="font-semibold text-gray-800">${(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t mt-3 pt-3 flex justify-between text-lg font-bold">
                            <span className="text-gray-800">Total:</span>
                            <span className="text-purple-600">${receipt.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowReceipt(false)}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}
    </>)
}

export default Receipt;